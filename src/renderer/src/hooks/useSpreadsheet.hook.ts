import { getBlobFromDataURL } from "@renderer/helpers/file.helper";
import { useCallback, useState } from "react";
import XLSX from "xlsx";

export function useSpreadsheet() {
  const [workbookString, setWorkbookString] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFile = useCallback(async (dataURL: string | null) => {
    if (dataURL === null) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataURL = event.target.result;
      const base64Data = dataURL.split(",")[1];
      const workbook = XLSX.read(base64Data, { type: "base64" });
      const workbookString = JSON.stringify(workbook);
      setWorkbookString(workbookString);
      setProgress(100);
    };
    reader.onerror = (error) => {
      console.error(error);
    };
    reader.onprogress = (event) => {
      if (event.lengthComputable)
        setProgress(Math.round(event.loaded / event.total) * 100);
    };
    const blob = await getBlobFromDataURL(dataURL);
    reader.readAsDataURL(blob!);
  }, []);

  return { workbookString, handleFile, progress };
}
