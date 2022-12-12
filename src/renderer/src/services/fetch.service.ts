import { BaseFetchService } from '@renderer/services/baseFetch.service'
import { Citation } from '@renderer/types/citation.type'
import { Details } from '@renderer/types/details.type'
import { SCHOLAR_URL_REGEX } from '@renderer/helpers/regex.helper'
import { YearType } from '@renderer/types/years.type'

class FetchService implements BaseFetchService {
  private currentPage: string | undefined
  private parser: DOMParser
  private abortController: AbortController
  private years: YearType | undefined

  constructor() {
    this.parser = new DOMParser()
    this.abortController = new AbortController()
  }

  private getParsedPage(): Document {
    if (!this.currentPage) {
      throw new Error('No page to parse')
    }

    return this.parser.parseFromString(this.currentPage, 'text/html')
  }

  private validateAuthorUrl(authorUrl: string): boolean {
    if (!authorUrl) {
      throw new Error('Author ID is required')
    }

    return SCHOLAR_URL_REGEX.test(authorUrl)
  }

  public abortPendingRequests(): void {
    this.abortController.abort()
    this.abortController = new AbortController()
  }

  public async setupYearsToFetch(years: YearType): Promise<void> {
    this.years = years
  }

  public async visitAuthor(authorUrl: string): Promise<void> {
    if (!this.validateAuthorUrl(authorUrl)) {
      throw new Error(`Invalid author URL - ${authorUrl}`)
    }

    const pageText = await fetch(authorUrl, {
      signal: this.abortController.signal,
      method: 'GET',
      mode: 'cors',
      keepalive: true
    })
      .then((res) => {
        if (res.ok) {
          return res.text()
        }

        throw new Error(JSON.stringify(res))
      })
      .catch((err) => {
        return Promise.reject(err)
      })

    console.log('Definindo URL', authorUrl)
    this.currentPage = pageText
  }

  private getNameFromDocument(document): string {
    const nameElement = document.querySelector('#gsc_prf_in')

    if (!nameElement) {
      console.warn(document)
      console.warn('nameElement', nameElement)
      const errorMessage = 'Erro ao buscar nome de pesquisador'
      throw new Error(errorMessage)
    }

    const name = nameElement.textContent
    return name
  }

  private getHIndexFromDocument(document): string {
    const allDetailsValues = document.querySelectorAll('.gsc_rsb_std')
    const hIndexElement = allDetailsValues[2]

    if (!hIndexElement) {
      console.warn(document)
      console.warn('hIndexElement', hIndexElement)
      const errorMessage = 'Erro ao buscar h-index de pesquisador'
      throw new Error(errorMessage)
    }

    const hIndex = hIndexElement.textContent
    return hIndex
  }

  private getI10IndexFromDocument(document): string {
    const allDetailsValues = document.querySelectorAll('.gsc_rsb_std')
    const i10IndexElement = allDetailsValues[4]

    if (!i10IndexElement) {
      console.warn(document)
      console.warn('i10IndexElement', i10IndexElement)
      const errorMessage = 'Erro ao buscar i10-index de pesquisador'
      throw new Error(errorMessage)
    }

    const i10Index = i10IndexElement.textContent
    return i10Index
  }

  public async fetchUserDetails(): Promise<Details> {
    const { documentElement } = this.getParsedPage()

    const name = this.getNameFromDocument(documentElement)
    const hIndex = this.getHIndexFromDocument(documentElement)
    const i10Index = this.getI10IndexFromDocument(documentElement)

    if (!name || !hIndex || !i10Index) {
      console.warn(name, hIndex, i10Index)
      throw new Error('Não foi possível obter dados de pesquisador')
    }

    const details: Details = { name, hIndex, i10Index }

    return details
  }

  private getYearsFromDocument(document): string[] {
    const years: string[] = []

    const totalYears = document.querySelectorAll('.gsc_g_t')
    for (const yearElement of totalYears) {
      if (!yearElement) {
        console.warn(document)
        console.warn(yearElement)
        const errorMessage = `Não foi possível obter ano do ${yearElement}`
        throw new Error(errorMessage)
      }
      const year = yearElement.textContent
      years.push(year)
    }

    return years
  }

  private getCitationsFromDocument(document): number[] {
    const totalCitations = document.querySelectorAll('.gsc_g_a')
    const totalYears = Array.from(document.querySelectorAll('.gsc_g_t')).length
    const citations: number[] = Array(totalYears)

    for (const citationElement of totalCitations) {
      if (!citationElement) {
        console.warn(document)
        console.warn(citationElement)
        const errorMessage = `Não foi possível obter citação do ${citationElement}`
        throw new Error(errorMessage)
      }
      const citationIndex = totalYears - Number(citationElement.style.zIndex)
      const citation = Number(citationElement.textContent)
      citations[citationIndex] = citation
    }

    return citations
  }

  public async fetchUserCitations(): Promise<Citation[]> {
    const { documentElement } = this.getParsedPage()

    const years = this.getYearsFromDocument(documentElement)
    const citations = this.getCitationsFromDocument(documentElement)

    const data: Citation[] = years
      .filter((y) => +y >= this.years.startYear && +y <= this.years.endYear)
      .map((y, i) => ({ year: y, citations: citations[i] }))
    console.log('Dados coletados', data)

    return data
  }
}

export default new FetchService()
