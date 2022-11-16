import axios from 'axios'

class FetchService {
  private currentPage: string | undefined
  private parser: DOMParser
  private abortController: AbortController

  constructor() {
    this.parser = new DOMParser()
    this.abortController = new AbortController()
  }

  private getParsedPage() {
    if (!this.currentPage) {
      throw new Error('No page to parse')
    }

    return this.parser.parseFromString(this.currentPage, 'text/html')
  }

  private validateAuthorUrl(authorUrl: string) {
    if (!authorUrl) {
      throw new Error('Author ID is required')
    }

    return /citations.+user=.+/.test(authorUrl)
  }

  public abortPendingRequests() {
    this.abortController.abort()
    this.abortController = new AbortController()
  }

  public async visitAuthor(authorUrl: string) {
    if (!this.validateAuthorUrl(authorUrl)) {
      throw new Error(`Invalid author URL - ${authorUrl}`)
    }

    // const proxyUrl = 'https://crossorigin.me';
    // const proxyUrl = 'https://corsproxy.github.io';
    const proxyUrl = 'https://corsproxy.io'

    const finalUrl = `${proxyUrl}/${authorUrl}`

    axios
      .get(finalUrl, {
        signal: this.abortController.signal,
        method: 'GET'
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data()
        }

        return Promise.reject(`Failed to fetch author page - ${finalUrl}`)
      })
      .then((data) => {
        console.log(data, 'oia eu aqui')
        this.currentPage = data
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  }

  public async fetchUserDetails(): Promise<any> {
    try {
      const { documentElement } = this.getParsedPage()

      const name = documentElement.querySelector('.gsc_prf_il')?.textContent
      const hIndex = documentElement.querySelector('.gsc_rsb_std')?.textContent
      const i10Index = documentElement.querySelector('.gsc_rsb_st')?.textContent

      return {
        name,
        hIndex,
        i10Index
      }
    } catch (err) {
      return Promise.reject(err)
    }
  }

  public async fetchUserCitations(): Promise<any> {
    try {
      const { documentElement } = this.getParsedPage()

      const years = documentElement.querySelectorAll('.gsc_g_t')
      const citations = documentElement.querySelectorAll('.gsc_g_al')

      const data = []

      for (let i = 0; i < years.length; i++) {
        data.push({
          year: years[i].textContent,
          citations: citations[i].textContent
        })
      }

      return data
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default new FetchService()
