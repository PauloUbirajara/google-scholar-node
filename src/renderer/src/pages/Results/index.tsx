import { useMemo } from 'react'
import { Box, Button, Stack, Text } from '@chakra-ui/react'

import SaveSheetJsService from '@renderer/services/saveSheetJs.service'
import { BaseSaveService } from '@renderer/services/baseSave.service'
import { Spreadsheet } from '@renderer/types/spreadsheet.type'

export const Results = (): JSX.Element => {
  const saveService: BaseSaveService = SaveSheetJsService

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

  return (
    <Box h={'full'}>
      <Stack gap={5}>
        <Text fontSize="xl" as="b">
          {'Resultados'}
        </Text>

        {/* {data !== null ? (
          <SpreadsheetTable data={data} />
        ) : (
          'Não foi possível carregar a visualização do arquivo'
        )} */}

        <Button colorScheme={'blue'} disabled={!data} onClick={onClick}>
          Salvar
        </Button>
      </Stack>
    </Box>
  )
}
