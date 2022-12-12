import { IconButton, Text, Tooltip, Link } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'

export const Footer = (): JSX.Element => {
  const contactLink = 'https://linkedin.com/in/PauloUbirajara'
  return (
    <Text
      display="flex"
      position={'fixed'}
      margin={4}
      bottom="0"
      left="0"
      alignItems="center"
      justifyContent="flex-start"
      shadow="md"
    >
      <Tooltip label="Contato" placement="auto">
        <Link href={contactLink} isExternal>
          <IconButton size="sm" icon={<EmailIcon />} aria-label={'Contato'}></IconButton>
        </Link>
      </Tooltip>
    </Text>
  )
}
