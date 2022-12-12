import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { useEffect, useMemo } from 'react'

import { BaseSaveService } from '@renderer/services/baseSave.service'
import { Spreadsheet } from '@renderer/types/spreadsheet.type'
import SaveSheetJsService from '@renderer/services/saveSheetJs.service'
import { showNotification } from '@renderer/helpers/notification.helper'

const saveService: BaseSaveService = SaveSheetJsService

export const Results = (): JSX.Element => {
  const data: Spreadsheet | null = useMemo((): Spreadsheet | null => {
    try {
      return saveService.getData()
    } catch (e) {
      return null
    }
  }, [])

  useEffect(() => {
    if (!data) return

    const title = 'Coleta concluída!'
    const body = 'A coleta das citações solicitadas foi concluída com sucesso.'

    showNotification(title, body)
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
