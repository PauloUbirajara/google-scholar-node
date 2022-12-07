import { Text, Box, Stack } from '@chakra-ui/react'

import { FileSelectForm } from '@renderer/components/FileSelectForm'

export const Main = (): JSX.Element => {
  return (
    <Stack direction={'column'} spacing={5}>
      <Text fontSize="xl" as="b">
        Coletar Citações
      </Text>
      <FileSelectForm />
    </Stack>
  )
}
