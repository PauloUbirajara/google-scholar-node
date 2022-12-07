import { useEffect, useState } from 'react'

import { SpreadsheetData } from '@renderer/interfaces/spreadsheet.interface'
import { useFileAdapter } from '@renderer/hooks/useFileAdapter'

export const useSpreadsheet = () => {
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<SpreadsheetData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const findAdapter = useFileAdapter()

  async function loadFileArrayBuffer(file): Promise<void> {
    const arrayBuffer = await file.arrayBuffer()
    const adapter = findAdapter(file)

    if (!adapter) {
      setIsLoaded(true)
      return
    }

    await adapter.loadFromArrayBufferAsync(arrayBuffer)
    const tempData = await adapter.getDataAsync()
    setData(tempData)
    setIsLoaded(true)
  }

  useEffect(() => {
    setIsLoaded(false)
    setData([])

    if (file === null) {
      setIsLoaded(true)
      return
    }

    loadFileArrayBuffer(file)
  }, [file])

  return {
    setFile,
    data,
    isLoaded
  }
}
