import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Center, CircularProgress, Text } from '@chakra-ui/react'

import { useSpreadsheet } from '@renderer/hooks/useSpreadsheet'
import { StartSearchFloatingButton } from '@renderer/components/StartSearchFloatingButton'

export const Preview = (): JSX.Element => {
  const location = useLocation()
  const { setFile, data, isLoaded } = useSpreadsheet()

  const file = useMemo(() => {
    try {
      return location.state.file
    } catch (e) {
      return null
    }
  }, [])

  useEffect(() => {
    setFile(file)
  }, [])

  return (
    <>
      {!isLoaded && (
        <Center h={'100%'}>
          <CircularProgress isIndeterminate />
        </Center>
      )}
      {!file && (
        <Center>
          <Text fontSize={'xl'} color={'red.600'} fontWeight={700}>
            Não foi possível abrir o arquivo
          </Text>
        </Center>
      )}
      {file && (
        <Text fontSize={'lg'} marginBottom={'5'}>
          Arquivo selecionado: {file.name}
        </Text>
      )}
      {/* {data !== null ? (
        <SpreadsheetTable data={data} />
      ) : (
        'Não foi possível carregar a visualização do arquivo'
      )} */}
      {data && <StartSearchFloatingButton data={data} />}
    </>
  )
}
