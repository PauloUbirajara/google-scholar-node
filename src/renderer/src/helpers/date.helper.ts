const SEPARATOR = '_'

const addZeroPadOnStart = (num: number): string => num.toString().padStart(2, '0')

export const getFormattedDate = (date: Date): string => {
  const dateValues = [date.getDate(), date.getMonth() + 1, date.getFullYear()]
  return dateValues.map(addZeroPadOnStart).join(SEPARATOR)
}

export const getFormattedTime = (date: Date): string => {
  const timeValues = [date.getHours(), date.getMinutes(), date.getSeconds()]
  return timeValues.map(addZeroPadOnStart).join(SEPARATOR)
}
