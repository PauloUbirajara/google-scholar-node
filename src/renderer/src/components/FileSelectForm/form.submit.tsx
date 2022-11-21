import { Button, FormControl } from '@chakra-ui/react'

interface FormSubmitProps {
  file: File | undefined
}

export const FormSubmit = (props: FormSubmitProps): JSX.Element => {
  const { file } = props

  return (
    <FormControl>
      <Button type="submit" colorScheme="blue" cursor="pointer" isDisabled={file === undefined}>
        Visualizar
      </Button>
    </FormControl>
  )
}
