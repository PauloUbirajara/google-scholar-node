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

import { SpreadsheetData } from '../../interfaces/SpreadsheetData'
import FetchService from '../../services/fetch.service'

interface StartSearchProps {
  data: SpreadsheetData[]
}

export const StartSearchFloatingButton = (props: StartSearchProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [progress, setProgress] = useState(0)
  const [currentSheet, setCurrentSheet] = useState('')
  const [currentAuthor, setCurrentAuthor] = useState('')

  const { data } = props

  const maxAuthorCount = useMemo(
    () => data.reduce((acc, curr) => acc + curr.values[1].length, 0),
    [data]
  )

  useEffect(() => {
    if (!data || data.length === 0) {
      return
    }

    onOpen()
    setProgress(0)
    FetchService.abortPendingRequests()

    const DELAY_BETWEEN_REQUESTS = 15000

    ;(async (): Promise<void> => {
      await data.reduce(async (previousPromise, currentSheet) => {
        await previousPromise

        await currentSheet.values[1].reduce(async (previousPromise2, currentAuthor) => {
          await previousPromise2

          setCurrentSheet(currentSheet.sheetName)
          setCurrentAuthor(currentAuthor)

          try {
            await FetchService.visitAuthor(currentAuthor)

            const [details, citations] = await Promise.all([
              FetchService.fetchUserDetails(),
              FetchService.fetchUserCitations()
            ])

            console.log(currentAuthor, details, citations)
            return new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_REQUESTS))
          } catch (e) {
            console.warn(e)
          }

          setProgress((prev) => prev + 1)
        }, Promise.resolve())

        return new Promise((resolve) => {
          setTimeout(resolve, DELAY_BETWEEN_REQUESTS)
        })
      }, Promise.resolve())

      setCurrentSheet('')
      setCurrentAuthor('')
    })()

    return () => {
      console.log('morri')
      setCurrentSheet('')
      setCurrentAuthor('')
      setProgress(0)
      FetchService.abortPendingRequests()
    }
  }, [data])

  function handleStartSearch(): void {
    onOpen()
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
                <Progress
                  size="xs"
                  value={maxAuthorCount > 0 ? (progress / maxAuthorCount) * 100 : undefined}
                />
                <Text>{currentSheet && `Página atual: ${currentSheet}`}</Text>
                {currentAuthor && (
                  <Link href={currentAuthor} isExternal>
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
