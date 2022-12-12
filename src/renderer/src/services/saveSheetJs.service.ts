import SheetJs from 'xlsx'

import { BaseSaveService } from '@renderer/services/baseSave.service'
import { Spreadsheet } from '@renderer/types/spreadsheet.type'
import { getFormattedDate, getFormattedTime } from '@renderer/helpers/date.helper'
import { formatSheetJSRow, getHeaderForSheetJS } from '@renderer/helpers/save.helper'
import { YearType } from '@renderer/types/years.type'

class SaveSheetJsService implements BaseSaveService {
  private data?: Spreadsheet
  private years?: YearType

  load(data: Spreadsheet): void {
    this.data = data
  }

  setupYears(years: YearType): void {
    this.years = years
  }

  getData(): Spreadsheet {
    if (!this.data) {
      throw new Error('Dados não carregados')
    }

    return this.data
  }

  getYears(): YearType {
    if (!this.years) {
      throw new Error('Ano inicial e final não definidos')
    }

    return this.years
  }

  private formatSheetForSaving(sheet): string[] {
    return sheet.data.map((d) => formatSheetJSRow(d, this.getYears()))
  }

  private headerForSaving(): string[] {
    return getHeaderForSheetJS(this.getYears())
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
