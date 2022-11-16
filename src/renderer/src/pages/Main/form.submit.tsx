import { Input } from '@chakra-ui/react'
import { createElement } from 'react'

export const customSubmitControlProps = (isValidFile: any) => ({
  input: createElement(Input, {
    type: 'submit',
    variant: 'outline',
    value: 'Visualizar',
    colorScheme: 'blue',
    disabled: !isValidFile,
    cursor: 'pointer'
  }),
  isValid: isValidFile,
  required: true,
  textIfInvalid: 'Há algum dado inválido, verifique e envie novamente.'
})
