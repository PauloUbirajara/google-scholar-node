import { Spreadsheet } from '@renderer/types/spreadsheet.type'

export interface BaseSaveService {
  load(data: Spreadsheet): void
  getData(): Spreadsheet
  save(): void
  // TODO Exportar para PDF (?) - pode ser um outro tipo de servico
}
