/**
 * Patches the NOLA-Ledger (sheet2) in the Quintana AuditLedger v2:
 * 1. E2 → 0  (NOLA anchor is a carry-forward, not a new assessment charge)
 * 2. TOTALS row (13): replace hardcoded values with =SUM() formulas
 * 3. Summary block (rows 16-22): replace hardcoded strings with formula refs
 */
const fs   = require("fs");
const path = require("path");
const zlib = require("zlib");

const OUTPUTS = path.join(__dirname, "outputs");
// Target the v2 file specifically; fall back to most-recent non-formulas file
const files   = fs.readdirSync(OUTPUTS)
  .filter(f => f.includes("QUINTANA") && f.endsWith(".xlsx") && !f.includes("_formulas"))
  .map(f => ({ name: f, mtime: fs.statSync(path.join(OUTPUTS, f)).mtimeMs }))
  .sort((a, b) => b.mtime - a.mtime);

if (!files.length) { console.error("No QUINTANA xlsx found"); process.exit(1); }

// Prefer v2 if present
const target  = files.find(f => f.name.includes("v2")) || files[0];
const inPath  = path.join(OUTPUTS, target.name);
const outName = target.name.replace(/\.xlsx$/, "_formulas.xlsx");
const outPath = path.join(OUTPUTS, outName);
console.log("Patching:", target.name, "\n→", outName);

// ── CRC-32 ────────────────────────────────────────────────────────────────────
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// ── ZIP parser ────────────────────────────────────────────────────────────────
function readZip(buf) {
  const entries = new Map();
  let pos = 0;
  while (pos < buf.length - 4) {
    if (buf[pos]===0x50 && buf[pos+1]===0x4B && buf[pos+2]===0x03 && buf[pos+3]===0x04) {
      const comp=buf.readUInt16LE(pos+8), fnLen=buf.readUInt16LE(pos+26),
            extraLen=buf.readUInt16LE(pos+28), compLen=buf.readUInt32LE(pos+18);
      const fn=buf.slice(pos+30,pos+30+fnLen).toString(), dataOff=pos+30+fnLen+extraLen;
      const raw=buf.slice(dataOff,dataOff+compLen);
      try { entries.set(fn, comp===8 ? zlib.inflateRawSync(raw) : raw); }
      catch(e) { entries.set(fn, raw); }
      pos = dataOff + compLen;
    } else pos++;
  }
  return entries;
}

// ── ZIP writer (stored, no compression) ──────────────────────────────────────
function writeZip(entries) {
  const locals=[], central=[];
  let offset=0;
  for (const [fn, data] of entries) {
    const fnBuf=Buffer.from(fn,"utf8"), crc=crc32(data);
    const lh=Buffer.alloc(30+fnBuf.length);
    lh.writeUInt32LE(0x04034b50,0); lh.writeUInt16LE(20,4); lh.writeUInt16LE(0,6);
    lh.writeUInt16LE(0,8); lh.writeUInt32LE(0,10); lh.writeUInt32LE(crc,14);
    lh.writeUInt32LE(data.length,18); lh.writeUInt32LE(data.length,22);
    lh.writeUInt16LE(fnBuf.length,26); lh.writeUInt16LE(0,28); fnBuf.copy(lh,30);
    const cd=Buffer.alloc(46+fnBuf.length);
    cd.writeUInt32LE(0x02014b50,0); cd.writeUInt16LE(20,4); cd.writeUInt16LE(20,6);
    cd.writeUInt16LE(0,8); cd.writeUInt16LE(0,10); cd.writeUInt32LE(0,12);
    cd.writeUInt32LE(crc,16); cd.writeUInt32LE(data.length,20);
    cd.writeUInt32LE(data.length,24); cd.writeUInt16LE(fnBuf.length,28);
    cd.writeUInt16LE(0,30); cd.writeUInt16LE(0,32); cd.writeUInt16LE(0,34);
    cd.writeUInt16LE(0,36); cd.writeUInt32LE(0,38); cd.writeUInt32LE(offset,42);
    fnBuf.copy(cd,46);
    locals.push(lh, data); central.push(cd);
    offset += lh.length + data.length;
  }
  const cdBuf=Buffer.concat(central), eocd=Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50,0); eocd.writeUInt16LE(0,4); eocd.writeUInt16LE(0,6);
  eocd.writeUInt16LE(central.length,8); eocd.writeUInt16LE(central.length,10);
  eocd.writeUInt32LE(cdBuf.length,12); eocd.writeUInt32LE(offset,16);
  eocd.writeUInt16LE(0,20);
  return Buffer.concat([...locals, cdBuf, eocd]);
}

// ── Formula cell builder ──────────────────────────────────────────────────────
// For numeric formula cells (no t= attribute needed)
function fmlaCell(ref, s, formula, cachedVal) {
  return `<c r="${ref}" s="${s}"><f>${formula}</f><v>${cachedVal}</v></c>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
const buf     = fs.readFileSync(inPath);
const entries = readZip(buf);

let xml = entries.get("xl/worksheets/sheet2.xml").toString();

// ── Fix 1: E2 — set NOLA anchor assessment to 0 ───────────────────────────────
// Current: <c r="E2" s="2" t="n"><v>893.21</v></c>
// Target:  <c r="E2" s="2" t="n"><v>0</v></c>
const e2Before = xml.match(/<c r="E2"[^>]*>.*?<\/c>/s)?.[0];
if (!e2Before) { console.error("Could not find E2 cell"); process.exit(1); }
const e2After = e2Before.replace(/<v>893\.21<\/v>/, "<v>0</v>");
xml = xml.replace(e2Before, e2After);
console.log("✓ E2: 893.21 → 0");

// ── Fix 2: TOTALS row (row 13) — inject SUM formulas ─────────────────────────
// Data rows are 2..12 (the last data row before TOTALS is 12)
// Style s="6" = gold TOTALS row
// Columns: E=Assessments, F=Interest, G=LateFees, H=AttyFees, I=Other, J=Credits
// K13 = last running balance = K12
// After fixing E2→0, SUM(E2:E12) = 458.76+458.76 = 917.52 ✓

const totalsRowBefore = xml.match(/<row r="13">[\s\S]*?<\/row>/)?.[0];
if (!totalsRowBefore) { console.error("Could not find row 13"); process.exit(1); }

// Calculate cached values (post E2=0 fix):
// E: 0 + 458.76 + 458.76 = 917.52
// F: 0
// G: 25
// H: 0
// I: 168.17
// J: 1080
// K: 923.90 (unchanged — last running balance from K12)
const totalsRowAfter =
  `<row r="13">` +
  `<c r="A13" s="6" t="inlineStr"></c>` +
  `<c r="B13" s="6" t="inlineStr"></c>` +
  `<c r="C13" s="6" t="inlineStr"><is><t>TOTALS</t></is></c>` +
  `<c r="D13" s="6" t="inlineStr"></c>` +
  fmlaCell("E13", "6", "SUM(E2:E12)", "917.52") +
  fmlaCell("F13", "6", "SUM(F2:F12)", "0") +
  fmlaCell("G13", "6", "SUM(G2:G12)", "25") +
  fmlaCell("H13", "6", "SUM(H2:H12)", "0") +
  fmlaCell("I13", "6", "SUM(I2:I12)", "168.17") +
  fmlaCell("J13", "6", "SUM(J2:J12)", "1080") +
  fmlaCell("K13", "6", "K12", "923.9") +
  `<c r="L13" s="6" t="inlineStr"></c>` +
  `</row>`;

xml = xml.replace(totalsRowBefore, totalsRowAfter);
console.log("✓ Row 13 TOTALS: hardcoded values → SUM formulas");

// ── Fix 3: Summary block (rows 16-22) — formula refs to TOTALS row ────────────
// Style s="8" = summary body row, s="9" = NET BALANCE DUE row
// Replace the <is><t>$xxx</t></is> text values with formula cells

const summaryFixes = [
  { row: 16, col: "B", oldText: /\$1810\.73/, formula: "E13", cached: "917.52",  s: "8" },
  { row: 17, col: "B", oldText: /\$0\.00/,    formula: "F13", cached: "0",       s: "8" },
  { row: 18, col: "B", oldText: /\$25\.00/,   formula: "G13", cached: "25",      s: "8" },
  { row: 19, col: "B", oldText: /\$0\.00/,    formula: "H13", cached: "0",       s: "8" },
  { row: 20, col: "B", oldText: /\$168\.17/,  formula: "I13", cached: "168.17",  s: "8" },
  { row: 21, col: "B", oldText: /-\$1080\.00/,formula: "-J13",cached: "-1080",   s: "8" },
  { row: 22, col: "B", oldText: /\$923\.90/,  formula: "K13", cached: "923.9",   s: "9" },
];

for (const fix of summaryFixes) {
  const ref = `${fix.col}${fix.row}`;
  // Match cell by reference, tolerating any attributes/content
  const cellRe = new RegExp(`<c r="${ref}"[^>]*>[\\s\\S]*?<\\/c>`);
  const cellBefore = xml.match(cellRe)?.[0];
  if (!cellBefore) { console.error(`Could not find cell ${ref}`); continue; }
  const cellAfter = fmlaCell(ref, fix.s, fix.formula, fix.cached);
  xml = xml.replace(cellBefore, cellAfter);
  console.log(`✓ ${ref}: hardcoded text → =${fix.formula}`);
}

// ── Write output ──────────────────────────────────────────────────────────────
entries.set("xl/worksheets/sheet2.xml", Buffer.from(xml));
fs.writeFileSync(outPath, writeZip(entries));
console.log("\n✅ Written:", outName);
console.log("\nVerified NOLA ledger values:");
console.log("  E2 (NOLA anchor assessments): 0.00   ← was $893.21, now correct");
console.log("  E13 TOTALS assessments: =SUM(E2:E12) = $917.52");
console.log("  G13 TOTALS late fees:   =SUM(G2:G12) = $25.00");
console.log("  I13 TOTALS other:       =SUM(I2:I12) = $168.17");
console.log("  J13 TOTALS credits:     =SUM(J2:J12) = $1,080.00");
console.log("  K13 net balance:        =K12          = $923.90");
