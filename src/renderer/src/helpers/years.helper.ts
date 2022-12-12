import { YearType } from '@renderer/types/years.type'

export const validateYears = (years: YearType): boolean => {
  return years.endYear - years.startYear >= 0
}
export const getYearsAsArray = (years: YearType): string[] => {
  return Array.from(Array(years.endYear - years.startYear)).map((_, i) =>
    (years.endYear - i).toString()
  )
}
