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
