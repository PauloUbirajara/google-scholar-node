import { useState } from "react";
import XLSX from "xlsx";

import { GOOGLE_SCHOLAR_REGEX } from "@renderer/constants";

export function useParseRows() {
  const [links, setLinks] = useState([]);
  const [longestRows, setLongestRows] = useState([]);

  function readWorkbook(workbook) {
    let linksSet = new Set();
    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      rows
        .flatMap((elem) => elem)
        .filter((elem) => elem.match(GOOGLE_SCHOLAR_REGEX))
        .forEach((elem) => linksSet.add(elem));

      const currentLongestRow = Math.max(...rows.map((elem) => elem.length));
      setLongestRows((totalRows) => totalRows.concat([currentLongestRow]));
    }
    const newLinks = Array(...linksSet.values());
    setLinks(newLinks);
  }

  return { links, longestRows, readWorkbook };
}
