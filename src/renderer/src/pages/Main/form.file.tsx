import { Input } from '@chakra-ui/react'
import { ChangeEvent, createElement } from 'react'

export const customFileControlProps = (
  handleChangeFile: (event: ChangeEvent<HTMLInputElement>) => void,
  isValidFile: boolean
): unknown => ({
  input: createElement(Input, {
    accept: '.csv, .xlsx, .xls',
    cursor: 'pointer',
    isInvalid: !isValidFile,
    onChange: handleChangeFile,
    p: 1,
    type: 'file',
    variant: 'filled'
  }),
  isValid: isValidFile,
  label: 'Planilha',
  required: true,
  textIfInvalid: 'O upload de uma planilha válida é obrigatório.',
  textIfValid: 'Selecione a planilha com os dados dos pesquisadores do Google Scholar.'
})
