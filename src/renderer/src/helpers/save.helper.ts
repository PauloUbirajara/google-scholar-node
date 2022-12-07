import { SAVE_FORMAT } from '@renderer/enums/saveFormat.enum'
import { Author } from '@renderer/types/author.type'

export const headerNames = {
  [SAVE_FORMAT.NAME]: 'Nome',
  [SAVE_FORMAT.HINDEX]: 'HIndex',
  [SAVE_FORMAT.I10INDEX]: 'I10Index',
  [SAVE_FORMAT.LINK]: 'Link',
  [SAVE_FORMAT.YEAR_2015]: 'Citações - 2015',
  [SAVE_FORMAT.YEAR_2016]: 'Citações - 2016',
  [SAVE_FORMAT.YEAR_2017]: 'Citações - 2017',
  [SAVE_FORMAT.YEAR_2018]: 'Citações - 2018',
  [SAVE_FORMAT.YEAR_2019]: 'Citações - 2019',
  [SAVE_FORMAT.YEAR_2020]: 'Citações - 2020',
  [SAVE_FORMAT.YEAR_2021]: 'Citações - 2021',
  [SAVE_FORMAT.YEAR_2022]: 'Citações - 2022'
}

export const formatSheetJSRow = (row: Author): string[] => {
  const rowValues = {
    [SAVE_FORMAT.NAME]: row.details.name,
    [SAVE_FORMAT.HINDEX]: row.details.hIndex,
    [SAVE_FORMAT.I10INDEX]: row.details.i10Index,
    [SAVE_FORMAT.LINK]: row.details.url || 'Não definido',
    [SAVE_FORMAT.YEAR_2015]: row.citations.find((c) => c.year === '2015')?.citations || 0,
    [SAVE_FORMAT.YEAR_2016]: row.citations.find((c) => c.year === '2016')?.citations || 0,
    [SAVE_FORMAT.YEAR_2017]: row.citations.find((c) => c.year === '2017')?.citations || 0,
    [SAVE_FORMAT.YEAR_2018]: row.citations.find((c) => c.year === '2018')?.citations || 0,
    [SAVE_FORMAT.YEAR_2019]: row.citations.find((c) => c.year === '2019')?.citations || 0,
    [SAVE_FORMAT.YEAR_2020]: row.citations.find((c) => c.year === '2020')?.citations || 0,
    [SAVE_FORMAT.YEAR_2021]: row.citations.find((c) => c.year === '2021')?.citations || 0,
    [SAVE_FORMAT.YEAR_2022]: row.citations.find((c) => c.year === '2022')?.citations || 0
  }

  const values = Object.values(rowValues)
  const valuesAsString = values.map((val) => val.toString())

  return valuesAsString
}
