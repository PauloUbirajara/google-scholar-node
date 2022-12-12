import { Spreadsheet } from '@renderer/types/spreadsheet.type'
import { YearType } from '@renderer/types/years.type'

export interface BaseSaveService {
  load(data: Spreadsheet): void
  getData(): Spreadsheet
  getYears(): YearType
  save(): void
  setupYears(years: YearType): void
  // TODO Exportar para PDF (?) - pode ser um outro tipo de servico
}
