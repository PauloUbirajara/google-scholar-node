import ExcelJS from 'exceljs'

import { SpreadsheetData } from '../interfaces/spreadsheet.interface'
import { BaseSpreadsheetAdapter } from './base.adapter'

class ExcelJsAdapter extends BaseSpreadsheetAdapter {
  private workbook: ExcelJS.Workbook

  constructor() {
    const SUPPORTED_EXTENSIONS = ['.csv', '.xlsx']
    super(SUPPORTED_EXTENSIONS)
    this.workbook = new ExcelJS.Workbook()
  }

  private parseSheet(sheet: ExcelJS.Worksheet): SpreadsheetData {
    const sheetName = sheet.name
    const valuesAsRows = sheet.getSheetValues() as [][]

    const values = valuesAsRows.reduce((acc, row) => {
      row.forEach((value, index) => {
        if (!acc[index]) {
          acc[index] = []
        }
        acc[index].push(value)
      })
      return acc
    }, [] as string[][])

    return {
      sheetName,
      values
    }
  }

  public override getDataAsync(): Promise<SpreadsheetData[]> {
    if (!this.workbook) {
      throw new Error('Adapter não inicializado.')
    }

    return new Promise<SpreadsheetData[]>((resolve, reject) => {
      try {
        const sheets = Array.from(this.workbook.worksheets)
        const results = sheets.map(this.parseSheet)

        console.log(results)
        resolve(results)
      } catch (error) {
        reject(error)
      }
    })
  }

  public override async loadFromArrayBufferAsync(arrayBuffer: ArrayBuffer): Promise<void> {
    this.workbook = new ExcelJS.Workbook()

    await this.workbook.xlsx.load(arrayBuffer)
  }
}

export default new ExcelJsAdapter()
