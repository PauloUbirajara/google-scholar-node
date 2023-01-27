import { SheetDetails } from "@renderer/models/SheetDetails";
import { FormatDetailsToSheetInterface } from "@renderer/interface/formatDetailsToSheet.interface";
import { SheetPage } from "@renderer/types/sheetPage.type";
import { UserDetails } from "@renderer/types/userDetails.type";

class FormatDetailsToSheetService implements FormatDetailsToSheetInterface {
  private getLongestRow(matrix: string[][]): number {
    return matrix
      .map((row: string[]) => row.length)
      .reduce((b: number, a: number) => Math.max(b, a));
  }

  private getExpectedYears(): number[] {
    const expectedYears: number[] = [];
    const currentYear = new Date().getFullYear();

    for (let i = 0; currentYear - i >= 2015; i++) {
      const citationYear = currentYear - i;
      expectedYears.push(citationYear);
    }

    return expectedYears;
  }

  appendHeaders(pages: SheetPage[]): SheetDetails {
    const details = new SheetDetails(pages);

    const headers = [
      "H Index",
      "I10 Index",
      ...this.getExpectedYears().map((y) => `Citações - ${y}`)
    ];

    details.pages.forEach((p) => {
      if (!p.matrix) return;

      const longestRow = this.getLongestRow(p.matrix);
      if (p.matrix[0].length < longestRow) {
        p.matrix[0].length = longestRow;
      }

      p.matrix[0] = p.matrix[0].concat(headers);
    });

    return details;
  }

  parseRows(details: SheetDetails): SheetPage[] {
    let pages = Array.from(details.pages);

    pages = pages.map((p) => {
      const longestRow = p.matrix[0].length;
      const matrix = p.matrix.map((r: string[], idx: number) => {
        if (idx === 0) return r;
        const row = Array.from(r);
        try {
          const parsedData: UserDetails = JSON.parse(row[row.length - 1]);
          row.length -= 1;
          const dataToAdd = [
            parsedData.details.hindex,
            parsedData.details.i10index,
            ...this.getExpectedYears().map(
              (y) =>
                parsedData.citations
                  .find((c) => +c.year === y)
                  ?.citations.toString() || "0"
            )
          ];

          if (row.length < longestRow) {
            row.length = longestRow - dataToAdd.length;
          }

          return row.concat(dataToAdd);
        } catch (e) {
          console.warn(
            "Não foi adicionado dados do pesquisador na última posição, continuando"
          );
          console.warn(e);
          return row;
        }
      });
      return { name: p.name, matrix };
    });

    return pages;
  }
}

export default new FormatDetailsToSheetService();
