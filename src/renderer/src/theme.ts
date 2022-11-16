import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.200',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800'
      }
    })
  }
})

export default theme
