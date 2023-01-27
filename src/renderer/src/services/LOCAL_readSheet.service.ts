import xlsx, { WorkSheet } from "xlsx";

import ReadSheetInterface from "@renderer/interface/readSheet.interface";
import { SheetPage } from "@renderer/types/sheetPage.type";

function sheetToAOA(sheet: WorkSheet): string[][] {
  return xlsx.utils.sheet_to_json(sheet, { header: 1, blankrows: false });
}

class LocalReadSheetService implements ReadSheetInterface {
  async read(sheet: File): Promise<SheetPage[]> {
    const arrayBuffer = await sheet.arrayBuffer();
    const contents = xlsx.read(arrayBuffer);
    const pages: SheetPage[] = contents.SheetNames.map((sheetName) => ({
      name: sheetName,
      matrix: sheetToAOA(contents.Sheets[sheetName])
    }));

    return pages;
  }
}

export default new LocalReadSheetService();
