import { adapters } from '@renderer/adapters'
import { BaseSpreadsheetAdapter } from '@renderer/adapters/base.adapter'

function findSupportedAdapter(file: File): BaseSpreadsheetAdapter | undefined {
  return adapters.find((ad) => ad.isValid(file.name))
}

export const useFileAdapter = () => findSupportedAdapter
