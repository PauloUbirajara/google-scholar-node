import { useMemo } from 'react'
import { Box, Button, Stack, Text } from '@chakra-ui/react'

import SaveSheetJsService from '@renderer/services/saveSheetJs.service'
import { BaseSaveService } from '@renderer/services/baseSave.service'
import { Spreadsheet } from '@renderer/types/spreadsheet.type'

const saveService: BaseSaveService = SaveSheetJsService

export const Results = (): JSX.Element => {
  const data: Spreadsheet | null = useMemo((): Spreadsheet | null => {
    try {
      return saveService.getData()
    } catch (e) {
      return null
    }
  }, [])

  const onClick = (): void => {
    saveService.save()
  }

  const isSavingDisabled = !data

  return (
    <Box h={'full'}>
      <Stack gap={5}>
        <Text fontSize="xl" as="b">
          {'Resultados'}
        </Text>

        <Button colorScheme={'blue'} disabled={isSavingDisabled} onClick={onClick}>
          Salvar
        </Button>
      </Stack>
    </Box>
  )
}
