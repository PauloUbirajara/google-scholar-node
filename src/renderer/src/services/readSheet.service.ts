import ReadSheetInterface from "@renderer/interface/readSheet.interface";
import { SheetFile } from "@renderer/models/SheetFile";
import { FetchOptions } from "@renderer/types/fetchOptions.type";
import { SheetPage } from "@renderer/types/sheetPage.type";

const SHEET_API_URL = "https://scholar-sheet-api.vercel.app/api";

class ReadSheetService implements ReadSheetInterface {
  private getFetchOptions(file: SheetFile): FetchOptions {
    const body = new FormData();
    body.append("file", file.sheet);

    const fetchOptions = {
      method: "POST",
      body
    };

    return fetchOptions;
  }

  async read(sheet: File): Promise<SheetPage[]> {
    const file = new SheetFile(sheet);
    const response = await fetch(
      `${SHEET_API_URL}/${file.getExtension()}`,
      this.getFetchOptions(file)
    );

    if (!response.ok)
      throw new Error("Erro ao solicitar leitura de planilha por API");

    const contents: SheetPage[] = await response.json();
    return contents;
  }
}

export default new ReadSheetService();
