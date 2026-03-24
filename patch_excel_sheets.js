/**
 * Patch the Quintana AuditLedger Excel to reorder sheets correctly.
 * Required: SOA(1), NOLA-Ledger(2), Association Ledger(3),
 *           Unit Owner Profile(4), Compliance Checklist(5), NOLA Validation(6)
 */
const fs   = require("fs");
const path = require("path");
const zlib = require("zlib");

const OUTPUTS = path.join(__dirname, "outputs");
const files   = fs.readdirSync(OUTPUTS)
  .filter(f => f.includes("QUINTANA") && f.endsWith(".xlsx"))
  .map(f => ({ name: f, mtime: fs.statSync(path.join(OUTPUTS, f)).mtimeMs }))
  .sort((a, b) => b.mtime - a.mtime);

if (!files.length) { console.error("No QUINTANA AuditLedger found"); process.exit(1); }

const inPath  = path.join(OUTPUTS, files[0].name);
const outName = files[0].name.replace(/AuditLedger_v\d+_\d{4}-\d{2}-\d{2}/,
  "AuditLedger_v2_2026-03-23");
const outPath = path.join(OUTPUTS, outName);
console.log("Patching:", files[0].name, "\n→", outName);

// ── CRC-32 ───────────────────────────────────────────────────────────────────
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// ── ZIP parser ───────────────────────────────────────────────────────────────
function readZip(buf) {
  const entries = new Map(); // preserves insertion order
  let pos = 0;
  while (pos < buf.length - 4) {
    if (buf[pos]===0x50 && buf[pos+1]===0x4B && buf[pos+2]===0x03 && buf[pos+3]===0x04) {
      const comp     = buf.readUInt16LE(pos + 8);
      const fnLen    = buf.readUInt16LE(pos + 26);
      const extraLen = buf.readUInt16LE(pos + 28);
      const compLen  = buf.readUInt32LE(pos + 18);
      const fn       = buf.slice(pos + 30, pos + 30 + fnLen).toString();
      const dataOff  = pos + 30 + fnLen + extraLen;
      const raw      = buf.slice(dataOff, dataOff + compLen);
      const data     = comp === 8 ? zlib.inflateRawSync(raw) : raw;
      entries.set(fn, data);
      pos = dataOff + compLen;
    } else { pos++; }
  }
  return entries;
}

// ── ZIP writer (stored, no compression) ─────────────────────────────────────
function writeZip(entries) {
  const locals = [];
  const central = [];
  let offset = 0;
  for (const [fn, data] of entries) {
    const fnBuf = Buffer.from(fn, "utf8");
    const crc   = crc32(data);
    // Local file header
    const lh = Buffer.alloc(30 + fnBuf.length);
    lh.writeUInt32LE(0x04034b50, 0);
    lh.writeUInt16LE(20,           4);
    lh.writeUInt16LE(0,            6);   // no compression
    lh.writeUInt16LE(0,            8);
    lh.writeUInt32LE(0,            10);
    lh.writeUInt32LE(crc,          14);
    lh.writeUInt32LE(data.length,  18);
    lh.writeUInt32LE(data.length,  22);
    lh.writeUInt16LE(fnBuf.length, 26);
    lh.writeUInt16LE(0,            28);
    fnBuf.copy(lh, 30);
    // Central directory entry
    const cd = Buffer.alloc(46 + fnBuf.length);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20,           4);
    cd.writeUInt16LE(20,           6);
    cd.writeUInt16LE(0,            8);
    cd.writeUInt16LE(0,            10);
    cd.writeUInt32LE(0,            12);
    cd.writeUInt32LE(crc,          16);
    cd.writeUInt32LE(data.length,  20);
    cd.writeUInt32LE(data.length,  24);
    cd.writeUInt16LE(fnBuf.length, 28);
    cd.writeUInt16LE(0,            30);
    cd.writeUInt16LE(0,            32);
    cd.writeUInt16LE(0,            34);
    cd.writeUInt16LE(0,            36);
    cd.writeUInt32LE(0,            38);
    cd.writeUInt32LE(offset,       42);
    fnBuf.copy(cd, 46);
    locals.push(lh, data);
    central.push(cd);
    offset += lh.length + data.length;
  }
  const cdBuf = Buffer.concat(central);
  const eocd  = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0,               4);
  eocd.writeUInt16LE(0,               6);
  eocd.writeUInt16LE(central.length,  8);
  eocd.writeUInt16LE(central.length, 10);
  eocd.writeUInt32LE(cdBuf.length,   12);
  eocd.writeUInt32LE(offset,         16);
  eocd.writeUInt16LE(0,              20);
  return Buffer.concat([...locals, cdBuf, eocd]);
}

// ── Main ─────────────────────────────────────────────────────────────────────
const buf     = fs.readFileSync(inPath);
const entries = readZip(buf);

// Current sheet name → physical sheet number (from workbook.xml + rels)
// workbook.xml: <sheet name="X" sheetId="N" r:id="rIdN"/>
// rels: rId1→sheet1.xml, rId2→sheet2.xml, etc.
const wbXml = entries.get("xl/workbook.xml").toString();
const sheetRe = /name="([^"]+)"[^/]*sheetId="(\d+)"[^/]*r:id="rId(\d+)"/g;
const currentSheets = []; // [{name, rId}]
let m;
while ((m = sheetRe.exec(wbXml)) !== null) {
  currentSheets.push({ name: m[1], rId: parseInt(m[3]) });
}
console.log("\nCurrent order:", currentSheets.map(s => s.name));

// Desired order
const DESIRED = [
  "Statement of Account",
  "NOLA-Ledger",
  "Association Ledger",
  "Unit Owner Profile",
  "Compliance Checklist",
  "NOLA Validation",
];

// Map name → current sheet number (= rId number, since rels map rIdN → sheetN.xml)
const nameToSheetNum = {};
for (const s of currentSheets) nameToSheetNum[s.name] = s.rId;
console.log("Name → sheet num:", nameToSheetNum);

const missing = DESIRED.filter(n => !nameToSheetNum[n]);
if (missing.length) { console.error("Missing sheets:", missing); process.exit(1); }

// Swap sheet data: copy old sheetN.xml content to correct position
// new position i+1 gets data from nameToSheetNum[DESIRED[i]]
const oldData = {};
for (let i = 1; i <= 6; i++) oldData[i] = entries.get(`xl/worksheets/sheet${i}.xml`);

for (const [i, name] of DESIRED.entries()) {
  const srcNum = nameToSheetNum[name];
  entries.set(`xl/worksheets/sheet${i+1}.xml`, oldData[srcNum]);
}

// Rewrite workbook.xml: list sheets in desired order, rId = position
let newSheets = "";
for (const [i, name] of DESIRED.entries()) {
  newSheets += `<sheet xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ` +
    `name="${name}" sheetId="${i+1}" state="visible" r:id="rId${i+1}"/>`;
}
const newWb = wbXml.replace(/<sheets>[\s\S]*?<\/sheets>/, `<sheets>${newSheets}</sheets>`);
entries.set("xl/workbook.xml", Buffer.from(newWb));

// Update rels: rIdN → /xl/worksheets/sheetN.xml (already correct structure, just ensure 1-6)
const relsXml = entries.get("xl/_rels/workbook.xml.rels").toString();
// Remove old worksheet rels, keep styles/theme
let newRels = relsXml.replace(
  /<Relationship[^>]*worksheets\/sheet\d+[^>]*\/>/g, ""
);
for (let i = 1; i <= 6; i++) {
  const rel = `<Relationship Id="rId${i}" ` +
    `Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" ` +
    `Target="/xl/worksheets/sheet${i}.xml"/>`;
  newRels = newRels.replace("</Relationships>", rel + "</Relationships>");
}
entries.set("xl/_rels/workbook.xml.rels", Buffer.from(newRels));

// Write output
fs.writeFileSync(outPath, writeZip(entries));

console.log("\n✅ Patched file written:", outName);
console.log("New sheet order:");
DESIRED.forEach((n, i) => console.log(`  Sheet ${i+1}: ${n}`));
