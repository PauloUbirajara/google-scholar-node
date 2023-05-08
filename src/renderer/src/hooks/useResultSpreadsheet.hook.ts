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
  const [resultSheet, setResultSheet] = useState(null);

  function loadResults(workbook: XLSX.WorkBook, fetchResults: FetchResults) {
    const sheetNames = workbook.SheetNames;
    // for (const name of sheetNames) {
    let newResultSheet: string[][][] = [];
    for (let i = 0; i < sheetNames.length; i++) {
      const name = workbook.SheetNames[i];
      const sheet = workbook.Sheets[name];
      let JSONSheet: string[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1
      });

      JSONSheet[0] = [
        ...JSONSheet[0],
        ...getEmptyArray(JSONSheet[0].length, fetchResults.longestRows[i]),
        ...getHeader()
      ];

      JSONSheet = [
        ...JSONSheet[0],
        ...JSONSheet.slice(1).map((row) => {
          const linkIndex = row.findIndex((cell) =>
            cell.match(GOOGLE_SCHOLAR_REGEX)
          );
          if (linkIndex === -1) return;
          const link = row[linkIndex];
          const foundLinkIndex = fetchResults.links.indexOf(link);
          if (foundLinkIndex === -1) return;
          const rowDetails = getResultRow(fetchResults.results[foundLinkIndex]);
          return rowDetails;
        })
      ];
      // const resultSheet = []
      // resultSheet.push()
      // JSONSheet[0] = JSONSheet[0].concat(getHeader())

      // for (let j = 0; j < JSONSheet.length; j++) {
      //   const rowArray: string[] = JSONSheet[i] as string[];
      //   const emptyArray = Array(
      //     fetchResults.longestRows[i] - rowArray.length
      //   ).fill("");

      //   if (!(cell in fetchResults)) continue;
      //   JSONSheet[j] = rowArray.concat(emptyArray.concat(fetchResults.results));
      // }
      // console.log(JSONSheet);
      newResultSheet.push(JSONSheet);
    }
    setResultSheet(newResultSheet);
  }

  return { resultSheet, loadResults };
}
