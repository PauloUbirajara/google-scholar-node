import { Text, Box, Center, Stack } from '@chakra-ui/react'

import { FileSelectForm } from '@renderer/FileSelectForm'

export const Main = (): JSX.Element => {
  return (
    <Box p={5} h={'full'}>
      <Center>
        <Stack p={5} direction={'column'} spacing={5}>
          <Text fontSize="xl" as="b">
            Coletar Citações
          </Text>
          <FileSelectForm />
        </Stack>
      </Center>
    </Box>
  )
}
