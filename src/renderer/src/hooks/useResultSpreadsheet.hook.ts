import XLSX from "xlsx";
import { useState } from "react";

import { FetchResults } from "@renderer/types/fetchResults.type";
import {
  getEmptyArray,
  getHeader,
  getResultRow
} from "@renderer/helpers/user.helper";
import { GOOGLE_SCHOLAR_REGEX } from "@renderer/constants";

export function useResultSpreadsheet() {
  const [resultSheet, setResultSheet] = useState<XLSX.WorkBook>();

  function loadResults(workbook: XLSX.WorkBook, fetchResults: FetchResults) {
    const sheetNames = workbook.SheetNames;
    let newResultSheet: string[][][] = [];
    for (let i = 0; i < sheetNames.length; i++) {
      const name = workbook.SheetNames[i];
      const sheet = workbook.Sheets[name];
      let JSONSheet: string[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1
      });

      JSONSheet = [
        [...getEmptyArray(fetchResults.longestRows[i] + 1), ...getHeader()],
        ...JSONSheet
      ];

      // JSONSheet[1] = JSONSheet[1].map((elem) =>
      //   elem === undefined || elem === null ? "" : elem
      // );

      for (let j = 1; j < JSONSheet.length; j++) {
        const rowSize = JSONSheet[j].length;
        JSONSheet[j] = [
          ...JSONSheet[j],
          ...getEmptyArray(rowSize, fetchResults.longestRows[i] + 1)
        ];

        const linkIndex = JSONSheet[j].findIndex((cell) =>
          GOOGLE_SCHOLAR_REGEX.test(cell)
        );
        if (linkIndex === -1) continue;
        const link = JSONSheet[j][linkIndex];
        const foundLinkIndex = fetchResults.links.indexOf(link);
        if (foundLinkIndex === -1) continue;
        const rowDetails = getResultRow(fetchResults.results[foundLinkIndex]);
        JSONSheet[j] = [...JSONSheet[j], ...rowDetails];
      }

      // for (let i = 1; i < JSONSheet.length; i++) {
      //   JSONSheet[i] = [
      //     ...JSONSheet[i]
      //   ]
      // }

      console.log("oia", JSONSheet);

      // for (let i = 1; i < JSONSheet.length; i++) {
      //   JSONSheet[i] = [
      //     ...JSONSheet[i].map((row) => {
      //       const linkIndex = row.findIndex((cell) =>
      //         GOOGLE_SCHOLAR_REGEX.test(cell)
      //       );
      //       if (linkIndex === -1) return "";
      //       const link = row[linkIndex];
      //       const foundLinkIndex = fetchResults.links.indexOf(link);
      //       if (foundLinkIndex === -1) return "";
      //       const rowDetails = getResultRow(
      //         fetchResults.results[foundLinkIndex]
      //       );
      //       return rowDetails;
      //     })
      //   ];
      // }

      JSONSheet = JSONSheet.map((elem) =>
        elem === undefined || elem === null ? "" : elem
      );

      newResultSheet.push(JSONSheet);
    }
    console.log(newResultSheet);

    for (let i = 0; i < workbook.SheetNames.length; i++) {
      const sheetName = workbook.SheetNames[i];
      workbook.Sheets[sheetName] = XLSX.utils.json_to_sheet(newResultSheet[i]);
    }

    setResultSheet(workbook);
  }

  return { resultSheet, loadResults };
}
