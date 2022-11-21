import { Stack } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FormFile } from './form.file'
import { FormSubmit } from './form.submit'

export const FileSelectForm = (): JSX.Element => {
  const [file, setFile] = useState<File>()
  const navigate = useNavigate()

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()

    navigate('/preview', { state: { file } })
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <FormFile setFile={setFile} />
          <FormSubmit file={file} />
        </Stack>
      </form>
    </>
  )
}
