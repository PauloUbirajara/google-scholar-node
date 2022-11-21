import { SCHOLAR_URL_REGEX } from '@renderer/helpers/regex.helper'
import { SpreadsheetData } from '@renderer/interfaces/spreadsheet.interface'

export function getValidCells(sheet: SpreadsheetData): string[] {
  // Retorna um vetor contendo apenas os links dos perfis

  return sheet.values.reduce(
    (total: string[], current: string[]) =>
      current.filter((cell) => SCHOLAR_URL_REGEX.test(cell as string)).concat(total),
    []
  )
}
