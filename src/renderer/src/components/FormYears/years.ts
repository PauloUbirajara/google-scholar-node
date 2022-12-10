const currentYear = new Date().getFullYear()
const yearsToGenerate = 100
export const years = Array.from(Array(yearsToGenerate)).map((_, i) => currentYear - i)
