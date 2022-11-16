import { BaseSpreadsheetAdapter } from './ISpreadsheetAdapter'
import ExcelJsAdapter from './ExcelJsAdapter'
import SheetJsAdapter from './SheetJsAdapter'

export const adapters: BaseSpreadsheetAdapter[] = [ExcelJsAdapter, SheetJsAdapter]
