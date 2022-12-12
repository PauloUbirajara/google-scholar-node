import { Citation } from '@renderer/types/citation.type'
import { Details } from '@renderer/types/details.type'
import { YearType } from '@renderer/types/years.type'

export interface BaseFetchService {
  abortPendingRequests(): void
  fetchUserCitations(): Promise<Citation[]>
  fetchUserDetails(): Promise<Details>
  setupYearsToFetch(years: YearType): Promise<void>
  visitAuthor(authorUrl: string): Promise<void>
}
