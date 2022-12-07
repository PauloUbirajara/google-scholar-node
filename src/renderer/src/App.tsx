import { Box } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from '@renderer/components/Header'
import { CustomBreadcrumb } from '@renderer/components/CustomBreadcrumb'
import { Main } from '@renderer/pages/Main'
import { Preview } from '@renderer/pages/Preview'
import { Results } from '@renderer/pages/Results'

const App = (): JSX.Element => {
  return (
    <Box pt={'16'}>
      <BrowserRouter>
        <Header />
        <Box p={5}>
          <CustomBreadcrumb />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  )
}

export default App
