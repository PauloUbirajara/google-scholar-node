import { SCHOLAR_URL_REGEX } from '@renderer/helpers/regex.helper'
import { Citation } from '@renderer/types/citation.type'
import { Details } from '@renderer/types/details.type'
import { BaseService } from './base.service'

class FetchService implements BaseService {
  private currentPage: string | undefined
  private parser: DOMParser
  private abortController: AbortController

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

    this.currentPage = pageText
  }

  public async fetchUserDetails(): Promise<Details> {
    const { documentElement } = this.getParsedPage()

    const name = documentElement.querySelector('#gsc_prf_in')?.textContent

    const allDetailsValues = documentElement.querySelectorAll('.gsc_rsb_std')
    const hIndex = allDetailsValues[2].textContent
    const i10Index = allDetailsValues[4].textContent

    if (!name || !hIndex || !i10Index) {
      console.warn(name, hIndex, i10Index)
      throw new Error('Não foi possível obter dados de pesquisador')
    }

    const details: Details = { name, hIndex, i10Index, authorUrl }

    return details
  }

  public async fetchUserCitations(): Promise<Citation[]> {
    const { documentElement } = this.getParsedPage()

    const totalYears = documentElement.querySelectorAll('.gsc_g_t')
    const totalCitations = documentElement.querySelectorAll('.gsc_g_al')

    const data: Citation[] = []

    for (let i = 0; i < totalYears.length; i++) {
      const year = totalYears[i].textContent
      const citations = Number(totalCitations[i].textContent)

      if (year && citations) {
        const citationPerYear: Citation = { year, citations }
        data.push(citationPerYear)
      }
    }

    return data
  }
}

export default new FetchService()
