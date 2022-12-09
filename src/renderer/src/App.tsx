import { Box } from '@chakra-ui/react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Header } from '@renderer/components/Header'
import { CustomBreadcrumb } from '@renderer/components/CustomBreadcrumb'
import { Main } from '@renderer/pages/Main'
import { Preview } from '@renderer/pages/Preview'
import { Results } from '@renderer/pages/Results'

const App = (): JSX.Element => {
  return (
    <Box pt={'16'}>
      <HashRouter>
        <Header />
        <Box p={5}>
          <CustomBreadcrumb />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<Navigate to={'/'} />} />
          </Routes>
        </Box>
      </HashRouter>
    </Box>
  )
}

export default App
