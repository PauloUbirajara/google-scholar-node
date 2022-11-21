const VALID_SPREADSHEET_EXTENSIONS = ['csv', 'xls', 'xlsx']

export const validateSpreadsheet = (file: File | null): boolean => {
  if (!file || file === null || file === undefined) {
    return false
  }

  return VALID_SPREADSHEET_EXTENSIONS.includes(file.name.split('.').pop() || '')
}
