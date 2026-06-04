import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import Papa from "papaparse";

export function makeCsv<T extends Record<string, unknown>>(rows: T[]) {
  return Papa.unparse(rows);
}

export async function makePdfReport(title: string, rows: Record<string, unknown>[]) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([842, 595]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  page.drawText(title, { x: 36, y: 548, size: 18, font: bold, color: rgb(0.05, 0.16, 0.24) });
  page.drawText(`Generated: ${new Date().toLocaleString("en-IN")}`, { x: 36, y: 524, size: 9, font });

  const headers = Object.keys(rows[0] || { message: "No records available" }).slice(0, 6);
  const data = rows.length ? rows : [{ message: "No records available" }];
  let y = 492;

  headers.forEach((header, index) => {
    page.drawText(header.toUpperCase(), { x: 36 + index * 130, y, size: 8, font: bold });
  });
  y -= 18;

  for (const row of data.slice(0, 22)) {
    headers.forEach((header, index) => {
      const text = String(row[header] ?? "").slice(0, 28);
      page.drawText(text, { x: 36 + index * 130, y, size: 8, font });
    });
    y -= 18;
  }

  return pdf.save();
}
