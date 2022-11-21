import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { validateSpreadsheet } from './form.validations'

interface FormFileProps {
  setFile: (_: File | undefined) => void
}

export const FormFile = (props: FormFileProps): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [touched, setTouched] = useState(false)
  const [valid, setValid] = useState(false)

  const { setFile } = props

  const isInvalid = touched && !valid
  const label = 'Planilha'
  const helperText = 'Selecione a planilha com os dados dos pesquisadores do Google Scholar.'
  const errorText = 'O upload de uma planilha válida é obrigatório.'

  const onChange = (): void => {
    if (!touched) {
      setTouched(true)
    }

    setValid(false)
    setFile(undefined)

    const selectedFile = Array.from(fileInputRef.current!.files!)[0]

    if (!validateSpreadsheet(selectedFile)) {
      return
    }

    setValid(true)
    setFile(selectedFile)
  }

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        accept=".csv, .xlsx, .xls"
        cursor="pointer"
        isInvalid={isInvalid}
        onChange={onChange}
        p={1}
        ref={fileInputRef}
        shadow="base"
        type="file"
        variant="filled"
      />

      {isInvalid ? (
        <FormErrorMessage>{errorText}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
