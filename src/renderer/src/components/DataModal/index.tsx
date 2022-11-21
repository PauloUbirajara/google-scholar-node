import {
  Modal,
  Skeleton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { useSpreadsheet } from '@renderer/hooks/useSpreadsheet'
import { useEffect, useMemo, useState } from 'react'

interface DataModalProps {
  file: File | null
}

export const DataModal = (props: DataModalProps): JSX.Element => {
  const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure()
  const { setFile, data, isLoaded } = useSpreadsheet()

  useEffect(() => {
    setFile(props.file)
  }, [props.file])

  useEffect(() => {
    if (isLoaded) {
      openModal()
    }
  }, [isLoaded])

  const memoizedTabs = useMemo(() => data, [data])

  return (
    <Modal isOpen={isOpen} onClose={closeModal} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pré-visualizar planilha</ModalHeader>
        <ModalCloseButton />
        <Skeleton isLoaded={isLoaded} noOfLines={5}>
          <ModalBody pb={6} display={'table-cell'}>
            <SpreadsheetTabs tabs={memoizedTabs} />
          </ModalBody>
        </Skeleton>

        <ModalFooter>
          <Button colorScheme="blue" onClick={closeModal}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
