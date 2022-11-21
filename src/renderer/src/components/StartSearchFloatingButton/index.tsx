import { ExternalLinkIcon, InfoIcon } from '@chakra-ui/icons'
import {
  Box,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Stack,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'

import { BaseService } from '@renderer/services/base.service'
import { SpreadsheetData } from '../../interfaces/spreadsheet.interface'
import FetchService from '../../services/fetch.service'
import { getValidCells } from './valid.cells'
import { SCHOLAR_URL_REGEX } from '@renderer/helpers/regex.helper'
import { Citation } from '@renderer/types/citation.type'
import { Details } from '@renderer/types/details.type'

interface StartSearchProps {
  data: SpreadsheetData[]
}

const DELAY_BETWEEN_REQUESTS = 15000
const service: BaseService = FetchService

export const StartSearchFloatingButton = (props: StartSearchProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [progress, setProgress] = useState(0)
  const [currentSheet, setCurrentSheet] = useState<string>()
  const [authorDetails, setAuthorDetails] = useState<Details | undefined>()

  const { data } = props

  const maxAuthorCount = useMemo(
    () => data.reduce((acc, curr) => acc + getValidCells(curr).length, 0),
    [data]
  )

  async function visitProfile(currentAuthor: string): Promise<[Details, Citation[]] | undefined> {
    try {
      await service.visitAuthor(currentAuthor)

      const [details, citations] = await Promise.all([
        FetchService.fetchUserDetails(),
        FetchService.fetchUserCitations()
      ])

      await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_REQUESTS))
      return Promise.resolve([details, citations])
    } catch (e) {
      console.warn(e)
    } finally {
      setProgress((prev) => prev + 1)
    }
  }

  const resetProgressStats = () => {
    setCurrentSheet('')
    setAuthorDetails(undefined)
  }

  useEffect(() => {
    if (!data || data.length === 0) {
      return
    }

    onOpen()
    setProgress(0)
    FetchService.abortPendingRequests()
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    ;(async () => {
      console.clear()
      for (const sheet of data) {
        const filteredCells = sheet.values
          .flatMap((col) => col.filter((c) => SCHOLAR_URL_REGEX.test(c)))
          .filter((c) => c !== undefined && Boolean(c))

        console.log(filteredCells)

        for (const cell of filteredCells) {
          setCurrentSheet(sheet.sheetName)
          const [details, citations] = await visitProfile(cell)
          details.url = cell
          setAuthorDetails(details)
          console.log(details, citations)
          // TODO Criar nova planilha e ir carregando a partir daqui em memoria ou então só uma vez
        }
      }

      resetProgressStats()
    })()

    return () => {
      FetchService.abortPendingRequests()
    }
  }, [data])

  function handleStartSearch(): void {
    onOpen()
  }

  function calculateProgress(): number {
    if (maxAuthorCount == 0) return 0

    return (progress / maxAuthorCount) * 100
  }

  return (
    <>
      <Tooltip label="Ver estado da coleta">
        <IconButton
          position="fixed"
          right="8"
          bottom="8"
          shadow={'md'}
          size={'lg'}
          icon={<InfoIcon />}
          aria-label={'Pesquisar'}
          onClick={handleStartSearch}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent p={5}>
          <ModalHeader>Coleta de dados</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Stack gap={2}>
                <Progress size="xs" value={calculateProgress()} />
                <Text>{currentSheet && `Página atual: ${currentSheet}`}</Text>
                <Text>{progress}</Text>
                <Text>{maxAuthorCount}</Text>
                {authorDetails && (
                  <Link href={authorDetails.url && authorDetails.url} isExternal>
                    Ver pesquisador atual
                    <ExternalLinkIcon mx="2px" ml={2} />
                  </Link>
                )}
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
