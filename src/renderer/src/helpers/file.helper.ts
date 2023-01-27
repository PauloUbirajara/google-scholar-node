export function getOutputFilename(): string {
  const currentDate = new Date();
  const date = [
    currentDate.getDay(),
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
  ]
    .map((v: number) => v.toString())
    .map((v: string) => v.padStart(2, "0"))
    .join("_");
  const timestamp = [
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds()
  ]
    .map((v: number) => v.toString())
    .map((v: string) => v.padStart(2, "0"))
    .join("_");
  const outputFilename = `citations_${date}_${timestamp}.xlsx`;
  return outputFilename;
}
