import { Button, FormControl } from '@chakra-ui/react'
import { validateYears } from '@renderer/helpers/years.helper'

import { YearType } from '@renderer/types/years.type'

interface FormSubmitProps {
  file: File | undefined
  years: YearType | undefined
}

export const FormSubmit = (props: FormSubmitProps): JSX.Element => {
  const { file, years } = props

  const isDisabled = file === undefined || years === undefined || !validateYears(years)

  return (
    <FormControl>
      <Button type="submit" colorScheme="blue" cursor="pointer" isDisabled={isDisabled}>
        Iniciar coleta
      </Button>
    </FormControl>
  )
}
