import { ChangeEvent, useMemo, useState } from 'react'
import { Text, Box, Center, Stack } from '@chakra-ui/react'

import { customFileControlProps } from './form.file'
import { CustomFormControl } from '../../components/CustomFormControl'
import { customSubmitControlProps } from './form.submit'
import { useNavigate } from 'react-router-dom'
import { validateSpreadsheet } from './form.validations'

export const Main = () => {
  const [spreadsheet, setSpreadsheet] = useState<File | null>(null)
  const navigate = useNavigate()

  const isValidSpreadsheet = useMemo(() => validateSpreadsheet(spreadsheet), [spreadsheet])

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSpreadsheet(Array.from(event.target.files)[0])
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isValidSpreadsheet) {
      return
    }

    navigate('/preview', { state: { spreadsheet } })
  }

  return (
    <Box p={5} h={'full'}>
      <Center>
        <form onSubmit={handleSubmit}>
          <Stack p={5} direction={'column'} spacing={5}>
            <Text fontSize="xl" as="b">
              Coletar Citações
            </Text>

            <CustomFormControl {...customFileControlProps(handleChangeFile, isValidSpreadsheet)} />

            <CustomFormControl {...customSubmitControlProps(isValidSpreadsheet)} />
          </Stack>
        </form>
      </Center>
    </Box>
  )
}
