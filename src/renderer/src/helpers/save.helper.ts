import { SAVE_FORMAT } from '@renderer/enums/saveFormat.enum'
import { Author } from '@renderer/types/author.type'
import { YearType } from '@renderer/types/years.type'
import { getYearsAsArray } from '@renderer/helpers/years.helper'

// TODO Ao inves de pegar os anos com labels predefinidos, usar o YearType years que esta criado (falta pouco)
export const headerNames = {
  [SAVE_FORMAT.NAME]: 'Nome',
  [SAVE_FORMAT.HINDEX]: 'HIndex',
  [SAVE_FORMAT.I10INDEX]: 'I10Index',
  [SAVE_FORMAT.LINK]: 'Link'
}

const formatYearAsKey = (year: string): string => {
  return `Citações - ${year}`
}

export const getHeaderForSheetJS = (years: YearType): string[] => {
  const details = Object.values(headerNames)
  const yearsArray = getYearsAsArray(years).map(formatYearAsKey)
  return details.concat(yearsArray)
}

export const formatSheetJSRow = (row: Author, years: YearType): string[] => {
  const rowValues = {
    [SAVE_FORMAT.NAME]: row.details.name,
    [SAVE_FORMAT.HINDEX]: row.details.hIndex,
    [SAVE_FORMAT.I10INDEX]: row.details.i10Index,
    [SAVE_FORMAT.LINK]: row.details.url || 'Não definido'
  }

  getYearsAsArray(years).forEach((y) => {
    rowValues[formatYearAsKey(y)] = 0
  })

  row.citations.forEach((c) => {
    if (+c.year < years.startYear) return
    if (+c.year > years.endYear) return

    const yearKey = formatYearAsKey(c.year)
    const yearValue = c.citations
    rowValues[yearKey] = yearValue
  })

  const values = Object.values(rowValues)
  const valuesAsString = values.map((val) => (val || 0).toString())

  return valuesAsString
}
