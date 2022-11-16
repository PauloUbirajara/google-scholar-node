import { read, WorkBook } from 'xlsx'

import { SpreadsheetData } from '../interfaces/SpreadsheetData'
import { BaseSpreadsheetAdapter } from './ISpreadsheetAdapter'

class SheetJsAdapter extends BaseSpreadsheetAdapter {
  private data: WorkBook | null | undefined

  constructor() {
    const SUPPORTED_EXTENSIONS = ['.xls']
    super(SUPPORTED_EXTENSIONS)
  }

  public override loadFromArrayBufferAsync(arrayBuffer: ArrayBuffer): Promise<void> {
    this.data = read(arrayBuffer, {
      type: 'buffer',
      raw: true
    })

    return Promise.resolve()
  }

  public override getDataAsync(): Promise<SpreadsheetData[]> {
    if (!this.data) {
      throw new Error('Adapter não inicializado.')
    }

    const sheetNames = Object.keys(this.data.Sheets).filter(
      (sheetName) => !sheetName.startsWith('!')
    )

    const results: SpreadsheetData[] = []

    for (const sheetName of sheetNames) {
      const sheet = this.data.Sheets[sheetName]

      const sheetData: SpreadsheetData = {
        sheetName: sheetName,
        values: []
      }

      const columns: { [_: string]: string[] } = {}

      Object.entries(sheet)
        .filter(([key]) => !key.startsWith('!'))
        .forEach(([key, value]) => {
          const column = key.replace(/\d/g, '')
          const row = +key.replace(/[A-Z]/g, '')

          if (!columns[column]) {
            columns[column] = []
          }

          columns[column][row] = value['v'] || ''
        })

      sheetData.values = Object.values(columns)

      results.push(sheetData)
    }

    return Promise.resolve(results)
  }
}

export default new SheetJsAdapter()
