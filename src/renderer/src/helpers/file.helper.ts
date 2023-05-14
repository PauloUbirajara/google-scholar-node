import { FileMeta } from "@renderer/types/filemeta.type";

export function getMetadataFromFile(file: File): FileMeta {
  const fileMeta = {
    name: file.name,
    type: file.type,
    lastModified: file.lastModified,
    size: file.size
  };
  return fileMeta;
}

export function saveFileInSessionStorage(file: File) {
  const dataURL = URL.createObjectURL(file);
  sessionStorage.setItem("file", dataURL);

  const fileMetadata = getMetadataFromFile(file);
  sessionStorage.setItem("fileMetadata", JSON.stringify(fileMetadata));
}

export async function getBlobFromDataURL(
  dataURL: string
): Promise<Blob | null> {
  try {
    const response = await fetch(dataURL);
    const blob = await response.blob();
    return blob;
  } catch (e) {
    console.warn("Could not fetch blob object from dataURL");
    console.warn(dataURL);
    console.warn(e);
  }
  return null;
}

export function getOutputFilename(): string {
  const currentDate = new Date();
  const filenameParams = [
    currentDate.getDay(),
    currentDate.getMonth() + 1,
    currentDate.getFullYear(),
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds()
  ]
    .map((v: number) => v.toString())
    .map((v: string) => v.padStart(2, "0"))
    .join("_");

  const outputFilename = `citations_${filenameParams}.xlsx`;
  return outputFilename;
}
