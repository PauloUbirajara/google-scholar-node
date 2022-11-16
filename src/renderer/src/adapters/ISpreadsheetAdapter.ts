import { SpreadsheetData } from '../interfaces/SpreadsheetData'

export abstract class BaseSpreadsheetAdapter {
  private readonly SUPPORTED_EXTENSIONS: string[]

  constructor(supportedExtensions: string[]) {
    this.SUPPORTED_EXTENSIONS = supportedExtensions
  }

  isValid(filename: string): boolean {
    const extension = filename.toLowerCase().split('.').pop()

    return this.SUPPORTED_EXTENSIONS.includes(`.${extension}`)
  }

  public abstract loadFromArrayBufferAsync(arrayBuffer: ArrayBuffer): Promise<void>
  public abstract getDataAsync(): Promise<SpreadsheetData[]>
}
