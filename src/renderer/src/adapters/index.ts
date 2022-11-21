import { BaseSpreadsheetAdapter } from './base.adapter'
import ExcelJsAdapter from './exceljs.adapter'
import SheetJsAdapter from './sheetjs.adapter'

export const adapters: BaseSpreadsheetAdapter[] = [ExcelJsAdapter, SheetJsAdapter]
