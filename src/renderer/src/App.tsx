import { Box } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header'
import { Main } from './pages/Main'
import { Preview } from './pages/Preview'

const App = (): JSX.Element => {
  return (
    <Box h={'100vh'} pt={'16'}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App
