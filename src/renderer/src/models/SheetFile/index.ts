export class SheetFile {
  public sheet: File;

  constructor(sheet: File) {
    this.sheet = sheet;
  }

  getExtension(): string {
    const name = this.sheet.name;
    const EXTENSION_REGEX = /[a-z0-9]+$/i;
    const extensionMatch = name.match(EXTENSION_REGEX);

    if (!extensionMatch)
      throw new Error("Não foi possível obter extensão de arquivo");

    const extension = extensionMatch[0];
    return extension;
  }
}
