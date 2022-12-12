import { Stack } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FormFile } from '@renderer/components/FormFile'
import { FormSubmit } from '@renderer/components/FormSubmit'
import { FormYears } from '@renderer/components/FormYears'
import { YearType } from '@renderer/types/years.type'

export const SetupForm = (): JSX.Element => {
  const [file, setFile] = useState<File>()
  const [years, setYears] = useState<YearType>()
  const navigate = useNavigate()

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()

    navigate('/preview', { state: { file, years } })
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <FormFile setFile={setFile} />
          <FormYears setYears={setYears} />
          <FormSubmit file={file} years={years} />
        </Stack>
      </form>
    </>
  )
}
