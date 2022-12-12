import { InfoIcon } from '@chakra-ui/icons'
import {
  Box,
  Center,
  CircularProgress,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Author } from '@renderer/types/author.type'
import { BaseFetchService } from '@renderer/services/baseFetch.service'
import { BaseSaveService } from '@renderer/services/baseSave.service'
import { getValidCells } from './valid.cells'
import { SCHOLAR_URL_REGEX } from '@renderer/helpers/regex.helper'
import { Sheet } from '@renderer/types/sheet.type'
import { Spreadsheet } from '@renderer/types/spreadsheet.type'
import { SpreadsheetData } from '@renderer/interfaces/spreadsheet.interface'
import FetchService from '@renderer/services/fetch.service'
import saveSheetJsService from '@renderer/services/saveSheetJs.service'

interface StartSearchProps {
  data: SpreadsheetData[]
}

const DELAY_BETWEEN_REQUESTS = 25000
const fetchService: BaseFetchService = FetchService
const saveService: BaseSaveService = saveSheetJsService

export const StartSearchFloatingButton = (props: StartSearchProps): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [progress, setProgress] = useState(0)
  const [currentSheet, setCurrentSheet] = useState<string>()

  const { data } = props
  const years = location.state?.years

  const maxAuthorCount = useMemo(
    () => data.reduce((acc, curr) => acc + getValidCells(curr).length, 0),
    [data]
  )

  async function visitProfile(currentAuthor: string): Promise<Author | undefined> {
    try {
      await fetchService.visitAuthor(currentAuthor)

      const details = await fetchService.fetchUserDetails()
      const citations = await fetchService.fetchUserCitations()

      await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_REQUESTS))
      return Promise.resolve({ details, citations } as Author)
    } catch (e) {
      console.warn(e)
      return Promise.reject(undefined)
    } finally {
      setProgress((prev) => prev + 1)
    }
  }

  const resetProgressStats = (): void => {
    setCurrentSheet('')
  }

  const startFetch = useCallback(async (): Promise<void> => {
    const spreadsheet: Spreadsheet = {
      sheets: []
    }

    for (const sheet of data) {
      const filteredCells = sheet.values
        .flatMap((col) => col.filter((c) => SCHOLAR_URL_REGEX.test(c)))
        .filter((c) => c !== undefined && Boolean(c))

      const tempSheet: Sheet = {
        name: sheet.sheetName,
        data: []
      }

      for (const cell of filteredCells) {
        setCurrentSheet(sheet.sheetName)

        try {
          const author = await visitProfile(cell)

          if (!author || author === undefined) {
            continue
          }

          author.details.url = cell
          tempSheet.data.push(author)
        } catch (e) {
          continue
        }
      }

      spreadsheet.sheets.push(tempSheet)
    }

    saveService.setupYears(years)
    saveService.load(spreadsheet)

    navigate('/results', { state: { years } })

    resetProgressStats()
  }, [data])

  useEffect(() => {
    if (!data || data.length === 0) return
    if (!years) return

    onOpen()
    setProgress(0)
    fetchService.abortPendingRequests()

    fetchService.setupYearsToFetch(years)
    startFetch()

    return () => {
      fetchService.abortPendingRequests()
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
      <Tooltip label="Ver estado da coleta" placement="auto">
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
              <Center>
                <CircularProgress value={calculateProgress()} size="5rem"></CircularProgress>
              </Center>
              <Center>
                <Text marginBottom={'2'}>{`${progress}/${maxAuthorCount}`}</Text>
              </Center>
              <Text>{currentSheet && `Página atual: ${currentSheet}`}</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
