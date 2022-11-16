import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Text,
  AbsoluteCenter,
  CircularProgress,
  Container,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'

import { useSpreadsheet } from '../../hooks/useSpreadsheet'
import { StartSearchFloatingButton } from '../../components/StartSearchFloatingButton'

export const Preview = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { setFile, data, isLoaded } = useSpreadsheet()

  const { spreadsheet } = location.state

  useEffect(() => {
    if (spreadsheet === undefined) {
      navigate('/')
      return
    }

    setFile(spreadsheet)
  }, [])

  return (
    <>
      {spreadsheet && (
        <Text p={5} fontSize={'lg'}>
          Arquivo selecionado: {spreadsheet.name}
        </Text>
      )}
      {!isLoaded ? (
        <AbsoluteCenter>
          <CircularProgress isIndeterminate />
        </AbsoluteCenter>
      ) : (
        <Tabs>
          <TabList position={'sticky'} top="4.5rem" shadow={'sm'} bgColor={'chakra-body-bg'}>
            {data.map((tab, idx) => (
              <Tab key={`tab-${tab.sheetName}-${idx}`}>{tab.sheetName}</Tab>
            ))}
          </TabList>

          <Container maxW={'container.xl'}>
            <TabPanels>
              {data.map((tab, idx) => (
                <TabPanel key={`panel-${tab.sheetName}-${idx}`}>
                  <Table size="sm">
                    <Thead
                      position={'sticky'}
                      top="7.085rem"
                      shadow={'sm'}
                      backdropFilter={'blur(50px)'}
                      backdropBlur={'md'}
                    >
                      <Tr>
                        {tab.values.map((col, idx) => (
                          <Th key={`col-${col}-${idx}`}>{col.find((c) => c != undefined)}</Th>
                        ))}
                      </Tr>
                    </Thead>

                    <Tbody>
                      {tab.values[0].map(
                        (_, idx: number) =>
                          idx > 1 && (
                            <Tr key={`row-${idx}`}>
                              {tab.values.map((col) => (
                                <Td key={`col-${col}-${idx}`}>{col[idx]}</Td>
                              ))}
                            </Tr>
                          )
                      )}
                    </Tbody>
                  </Table>
                </TabPanel>
              ))}
            </TabPanels>
          </Container>
        </Tabs>
      )}

      <StartSearchFloatingButton data={data} />
    </>
  )
}
