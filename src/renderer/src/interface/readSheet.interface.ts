import { SheetPage } from "@renderer/types/sheetPage.type";

interface ReadSheetInterface {
  read(sheet: File): Promise<SheetPage[]>;
}

export default ReadSheetInterface;
