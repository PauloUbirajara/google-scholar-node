import { Heading, Box, IconButton, useColorMode, Button, Tooltip } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

export const Header = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()

  const handleLogoClick = (): void => {
    navigate('/')
  }

  const handleThemeClick = (): void => {
    toggleColorMode()
  }

  return (
    <Box
      as="header"
      bg="gray.800"
      color="white"
      w="100%"
      p={4}
      display="flex"
      position={'fixed'}
      top="0"
      alignItems="center"
      justifyContent="space-between"
    >
      <Button onClick={handleLogoClick} variant="ghost" colorScheme={'white'}>
        <Heading as="h1" size="lg">
          Google Scholar
        </Heading>
      </Button>

      <Box>
        <Tooltip label="Alterar tema">
          <IconButton
            aria-label="Change theme"
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            variant="outline"
            colorScheme={colorMode === 'dark' ? 'yellow' : 'whiteAlpha'}
            onClick={handleThemeClick}
          />
        </Tooltip>
      </Box>
    </Box>
  )
}
