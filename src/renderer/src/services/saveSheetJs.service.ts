import SheetJs from 'xlsx'

import { BaseSaveService } from '@renderer/services/baseSave.service'
import { Spreadsheet } from '@renderer/types/spreadsheet.type'
import { getFormattedDate, getFormattedTime } from '@renderer/helpers/date.helper'
import { formatSheetJSRow, headerNames } from '@renderer/helpers/save.helper'

class SaveSheetJsService implements BaseSaveService {
  private data?: Spreadsheet

  load(data: Spreadsheet): void {
    this.data = data
  }

  getData(): Spreadsheet {
    if (!this.data) {
      throw new Error('Dados não carregados')
    }

    return this.data
  }

  private formatSheetForSaving(sheet) {
    return sheet.data.map(formatSheetJSRow)
  }

  private headerForSaving(): string[] {
    return Object.values(headerNames)
  }

  save(): void {
    try {
      const workbook = SheetJs.utils.book_new()

      for (const sheet of this.getData().sheets) {
        const data = SheetJs.utils.json_to_sheet(
          [this.headerForSaving(), ...this.formatSheetForSaving(sheet)],
          {
            skipHeader: true
          }
        )
        SheetJs.utils.book_append_sheet(workbook, data, sheet.name, true)
      }

      const outDate = new Date(Date.now())
      const outFilename = `citations_${getFormattedDate(outDate)}_${getFormattedTime(outDate)}.xlsx`

      SheetJs.writeFileXLSX(workbook, outFilename, { compression: true, sheetStubs: false })
    } catch (e) {
      throw new Error(`Error when saving in SheetJS - ${e}`)
    }
  }
}

export default new SaveSheetJsService()
