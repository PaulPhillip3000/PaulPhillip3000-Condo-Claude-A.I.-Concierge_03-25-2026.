/**
 * Comprehensive patch for Quintana AuditLedger:
 * 1. Rewrites SOA sheet with correct NOLA-anchored values ($979.90 total)
 * 2. Reorders sheets: SOA(1), NOLA-Ledger(2), Assoc Ledger(3),
 *    Unit Owner Profile(4), Compliance Checklist(5), NOLA Validation(6)
 */
const fs   = require("fs");
const path = require("path");
const zlib = require("zlib");

const OUTPUTS = path.join(__dirname, "outputs");
const files   = fs.readdirSync(OUTPUTS)
  .filter(f => f.includes("QUINTANA") && f.endsWith(".xlsx") && !f.includes("v2"))
  .map(f => ({ name: f, mtime: fs.statSync(path.join(OUTPUTS, f)).mtimeMs }))
  .sort((a, b) => b.mtime - a.mtime);

if (!files.length) { console.error("No QUINTANA AuditLedger found"); process.exit(1); }

const inPath  = path.join(OUTPUTS, files[0].name);
const outName = "SegoviaCondo_QUINTANA_215_AuditLedger_v2_2026-03-23.xlsx";
const outPath = path.join(OUTPUTS, outName);
console.log("Patching:", files[0].name, "\n→", outName);

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
      const comp     = buf.readUInt16LE(pos + 8);
      const fnLen    = buf.readUInt16LE(pos + 26);
      const extraLen = buf.readUInt16LE(pos + 28);
      const compLen  = buf.readUInt32LE(pos + 18);
      const fn       = buf.slice(pos + 30, pos + 30 + fnLen).toString();
      const dataOff  = pos + 30 + fnLen + extraLen;
      const raw      = buf.slice(dataOff, dataOff + compLen);
      try { entries.set(fn, comp === 8 ? zlib.inflateRawSync(raw) : raw); }
      catch(e) { entries.set(fn, raw); }
      pos = dataOff + compLen;
    } else { pos++; }
  }
  return entries;
}

// ── ZIP writer (stored, no compression) ──────────────────────────────────────
function writeZip(entries) {
  const locals = [];
  const central = [];
  let offset = 0;
  for (const [fn, data] of entries) {
    const fnBuf = Buffer.from(fn, "utf8");
    const crc   = crc32(data);
    const lh = Buffer.alloc(30 + fnBuf.length);
    lh.writeUInt32LE(0x04034b50, 0);
    lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0, 6); lh.writeUInt16LE(0, 8);
    lh.writeUInt32LE(0, 10); lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(data.length, 18); lh.writeUInt32LE(data.length, 22);
    lh.writeUInt16LE(fnBuf.length, 26); lh.writeUInt16LE(0, 28);
    fnBuf.copy(lh, 30);
    const cd = Buffer.alloc(46 + fnBuf.length);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4); cd.writeUInt16LE(20, 6); cd.writeUInt16LE(0, 8);
    cd.writeUInt16LE(0, 10); cd.writeUInt32LE(0, 12); cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(data.length, 20); cd.writeUInt32LE(data.length, 24);
    cd.writeUInt16LE(fnBuf.length, 28); cd.writeUInt16LE(0, 30);
    cd.writeUInt16LE(0, 32); cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36); cd.writeUInt32LE(0, 38);
    cd.writeUInt32LE(offset, 42);
    fnBuf.copy(cd, 46);
    locals.push(lh, data);
    central.push(cd);
    offset += lh.length + data.length;
  }
  const cdBuf = Buffer.concat(central);
  const eocd  = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4); eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(central.length, 8); eocd.writeUInt16LE(central.length, 10);
  eocd.writeUInt32LE(cdBuf.length, 12); eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);
  return Buffer.concat([...locals, cdBuf, eocd]);
}

// ── Build correct SOA sheet XML ───────────────────────────────────────────────
function buildSOASheet() {
  // Correct NOLA-anchored values for Quintana 215
  const rows = [
    { label: "NOLA Opening Balance",                         amount: 893.21,  style: "nola"  },
    { label: "Post-NOLA Assessments through April 1, 2026", amount: 917.52,  style: "normal"},
    { label: "Interest accrued (18% per annum)",            amount: 0.00,    style: "normal"},
    { label: "Administrative Late Fees",                    amount: 25.00,   style: "normal"},
    { label: "Attorney's Fees",                             amount: 0.00,    style: "normal"},
    { label: "Other Charges",                               amount: 168.17,  style: "normal"},
    { label: "Credits / Payments Received",                 amount: -1080.00,style: "normal"},
    { label: "Certified Mail / Service Charges",            amount: 40.00,   style: "normal"},
    { label: "Other Attorney Costs",                        amount: 16.00,   style: "normal"},
    { label: "TOTAL OUTSTANDING",                           amount: 979.90,  style: "total" },
  ];

  // Style indices matching the existing workbook styles:
  // s="15" = navy header, s="16" = normal row, s="17" = gold total,
  // s="18" = note italic, s="19" = flag row
  // We add a "nola" style row using the pale yellow fill (s="16" — same as normal,
  // visually distinguished only by the label)
  const styleMap = { normal: "16", total: "17", nola: "16" };

  let dataRows = "";
  // Header row
  dataRows += `<row r="1"><c r="A1" s="15" t="inlineStr"><is><t>Description</t></is></c>` +
              `<c r="B1" s="15" t="inlineStr"><is><t>Amount ($)</t></is></c></row>`;

  rows.forEach((r, i) => {
    const rowNum = i + 2;
    const s = styleMap[r.style];
    dataRows += `<row r="${rowNum}">` +
      `<c r="A${rowNum}" s="${s}" t="inlineStr"><is><t>${r.label}</t></is></c>` +
      `<c r="B${rowNum}" s="${s}" t="n"><v>${r.amount}</v></c>` +
      `</row>`;
  });

  // Note row
  const noteRow = rows.length + 3;
  dataRows += `<row r="${noteRow}">` +
    `<c r="A${noteRow}" s="18" t="inlineStr"><is><t>` +
    `NOLA Date: September 24, 2025 | NOLA Opening Balance: $893.21 | Prepared: March 23, 2026` +
    `</t></is></c></row>`;

  const lastRow = noteRow;
  return Buffer.from(
    `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
    `<sheetPr><outlinePr summaryBelow="1" summaryRight="1"/><pageSetUpPr/></sheetPr>` +
    `<dimension ref="A1:B${lastRow}"/>` +
    `<sheetViews><sheetView workbookViewId="0"><selection activeCell="A1" sqref="A1"/></sheetView></sheetViews>` +
    `<sheetFormatPr baseColWidth="8" defaultRowHeight="15"/>` +
    `<cols><col width="58" customWidth="1" min="1" max="1"/>` +
    `<col width="18" customWidth="1" min="2" max="2"/></cols>` +
    `<sheetData>${dataRows}</sheetData>` +
    `<pageMargins left="0.75" right="0.75" top="1" bottom="1" header="0.5" footer="0.5"/>` +
    `</worksheet>`
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
const buf     = fs.readFileSync(inPath);
const entries = readZip(buf);

// Step 1: Get current sheet mapping from workbook.xml
const wbXml = entries.get("xl/workbook.xml").toString();
const sheetRe = /name="([^"]+)"[^/]*sheetId="\d+"[^/]*r:id="rId(\d+)"/g;
const currentSheets = [];
let m;
while ((m = sheetRe.exec(wbXml)) !== null) {
  currentSheets.push({ name: m[1], rId: parseInt(m[2]) });
}
console.log("\nCurrent order:", currentSheets.map(s => s.name));

const nameToSheetNum = {};
for (const s of currentSheets) nameToSheetNum[s.name] = s.rId;

// Step 2: Desired order
const DESIRED = [
  "Statement of Account",
  "NOLA-Ledger",
  "Association Ledger",
  "Unit Owner Profile",
  "Compliance Checklist",
  "NOLA Validation",
];

const missing = DESIRED.filter(n => !nameToSheetNum[n]);
if (missing.length) { console.error("Missing sheets:", missing); process.exit(1); }

// Step 3: Save old sheet data
const totalSheets = currentSheets.length;
const oldData = {};
for (let i = 1; i <= totalSheets; i++) {
  oldData[i] = entries.get(`xl/worksheets/sheet${i}.xml`);
}

// Step 4: Reorder physical sheets + inject corrected SOA
for (const [i, name] of DESIRED.entries()) {
  const srcNum = nameToSheetNum[name];
  const newSheetNum = i + 1;
  if (name === "Statement of Account") {
    // Replace SOA with corrected version
    entries.set(`xl/worksheets/sheet${newSheetNum}.xml`, buildSOASheet());
    console.log(`  Sheet ${newSheetNum}: ${name} → REWRITTEN with correct values ($979.90)`);
  } else {
    entries.set(`xl/worksheets/sheet${newSheetNum}.xml`, oldData[srcNum]);
    console.log(`  Sheet ${newSheetNum}: ${name} (from sheet${srcNum})`);
  }
}

// Step 5: Rewrite workbook.xml with new order
let newSheets = "";
for (const [i, name] of DESIRED.entries()) {
  newSheets += `<sheet xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ` +
    `name="${name}" sheetId="${i+1}" state="visible" r:id="rId${i+1}"/>`;
}
const newWb = wbXml.replace(/<sheets>[\s\S]*?<\/sheets>/, `<sheets>${newSheets}</sheets>`);
entries.set("xl/workbook.xml", Buffer.from(newWb));

// Step 6: Update rels
const relsXml = entries.get("xl/_rels/workbook.xml.rels").toString();
let newRels = relsXml.replace(/<Relationship[^>]*worksheets\/sheet\d+[^>]*\/>/g, "");
for (let i = 1; i <= DESIRED.length; i++) {
  const rel = `<Relationship Id="rId${i}" ` +
    `Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" ` +
    `Target="/xl/worksheets/sheet${i}.xml"/>`;
  newRels = newRels.replace("</Relationships>", rel + "</Relationships>");
}
entries.set("xl/_rels/workbook.xml.rels", Buffer.from(newRels));

// Step 7: Write output
fs.writeFileSync(outPath, writeZip(entries));
console.log("\n✅ Patched file written:", outName);
console.log("\nSOA values:");
console.log("  NOLA Opening Balance:             $893.21");
console.log("  Post-NOLA Assessments:            $917.52");
console.log("  Administrative Late Fees:          $25.00");
console.log("  Other Charges (water+collection): $168.17");
console.log("  Credits / Payments:            -$1,080.00");
console.log("  Certified Mail:                    $40.00");
console.log("  Other Attorney Costs:              $16.00");
console.log("  ─────────────────────────────────────────");
console.log("  TOTAL OUTSTANDING:                $979.90");
