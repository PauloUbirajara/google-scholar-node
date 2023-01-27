import { SheetPage } from "@renderer/types/sheetPage.type";

export class SheetDetails {
  pages: SheetPage[];

  constructor(pages: SheetPage[]) {
    this.pages = pages;
  }
}
