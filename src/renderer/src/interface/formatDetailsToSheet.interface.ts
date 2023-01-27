import { SheetDetails } from "@renderer/models/SheetDetails";
import { SheetPage } from "@renderer/types/sheetPage.type";

export interface FormatDetailsToSheetInterface {
  appendHeaders(pages: SheetPage[]): SheetDetails;
  parseRows(details: SheetDetails): void;
}
