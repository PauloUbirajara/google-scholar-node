import { SheetDetails } from "@renderer/models/SheetDetails";

export interface SaveResultInterface {
  loadResultIntoWorkbook(result: SheetDetails): unknown;
  askToDownload(workbook: unknown): void;
}
