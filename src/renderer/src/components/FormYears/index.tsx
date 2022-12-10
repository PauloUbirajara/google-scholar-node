import { FormControl, FormHelperText, FormLabel, Select, Stack } from '@chakra-ui/react'
import { useRef, useState } from 'react'

import { YearType } from '@renderer/types/years.type'
import { years } from './years'

interface FormYearsProps {
  setYears: (_: YearType | undefined) => void
}

export const FormYears = (props: FormYearsProps): JSX.Element => {
  const startDateInputRef = useRef<HTMLSelectElement>(null)
  const endDateInputRef = useRef<HTMLSelectElement>(null)
  const [touched, setTouched] = useState(false)
  const [valid, setValid] = useState(false)

  const { setYears } = props

  const label = 'Intervalos'

  const onChangeYear = (): void => {
    if (startDateInputRef === null || endDateInputRef === null) return

    const startYear = +startDateInputRef.current!.value
    const endYear = +endDateInputRef.current!.value

    if (!startYear || !endYear) return
    if (!touched) setTouched(true)

    setYears(undefined)
    setValid(false)

    if (endYear - startYear < 0) return

    setYears({ startYear, endYear } as YearType)
    setValid(true)
  }

  const isInvalidStartYear = !valid || !startDateInputRef.current?.value
  const isInvalidEndYear = !valid || !endDateInputRef.current?.value

  return (
    <>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Stack direction="row">
          <Stack>
            <FormHelperText>Ano inicial</FormHelperText>
            <Select
              ref={startDateInputRef}
              placeholder="Selecione o ano inicial"
              variant="filled"
              onChange={(): void => onChangeYear()}
              isInvalid={isInvalidStartYear}
              shadow="base"
            >
              {years.map((y) => {
                return (
                  <option key={y} value={y} id={`start-year-${y}`}>
                    {y}
                  </option>
                )
              })}
            </Select>
          </Stack>
          <Stack>
            <FormHelperText>Ano final</FormHelperText>
            <Select
              ref={endDateInputRef}
              placeholder="Selecione o ano final"
              variant="filled"
              onChange={(): void => onChangeYear()}
              isInvalid={isInvalidEndYear}
              shadow="base"
            >
              {years.map((y) => {
                return (
                  <option key={y} value={y} id={`end-year-${y}`}>
                    {y}
                  </option>
                )
              })}
            </Select>
          </Stack>
        </Stack>
      </FormControl>
    </>
  )
}
