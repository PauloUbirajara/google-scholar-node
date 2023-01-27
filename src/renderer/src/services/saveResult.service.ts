import xlsx from "xlsx";

import { SaveResultInterface } from "@renderer/interface/saveResult.interface";
import { SheetDetails } from "@renderer/models/SheetDetails";
import { getOutputFilename } from "@renderer/helpers/file.helper";

class SaveResultService implements SaveResultInterface {
  loadResultIntoWorkbook(result: SheetDetails): unknown {
    const workbook = xlsx.utils.book_new();
    result.pages.forEach((p) => {
      const sheet = xlsx.utils.aoa_to_sheet(p.matrix);
      xlsx.utils.book_append_sheet(workbook, sheet, p.name);
    });
    return workbook;
  }

  askToDownload(workbook: unknown): void {
    try {
      xlsx.writeFile(workbook as xlsx.WorkBook, getOutputFilename());
    } catch (e) {
      console.warn("Não foi possível salvar resultado");
      console.warn(e);
    }
  }
}

export default new SaveResultService();
