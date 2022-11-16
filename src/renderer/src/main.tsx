import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import theme from './theme'
import App from './App'

createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
)
