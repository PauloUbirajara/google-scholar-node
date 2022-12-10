import { Text, Stack } from '@chakra-ui/react'

import { SetupForm } from '@renderer/components/SetupForm'

export const Main = (): JSX.Element => {
  return (
    <Stack direction={'column'} spacing={5}>
      <Text fontSize="xl" as="b">
        Coletar Citações
      </Text>
      <SetupForm />
    </Stack>
  )
}
