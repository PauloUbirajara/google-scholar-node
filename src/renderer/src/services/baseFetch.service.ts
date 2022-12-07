import { Citation } from '@renderer/types/citation.type'
import { Details } from '@renderer/types/details.type'

export interface BaseFetchService {
  abortPendingRequests(): void
  fetchUserCitations(): Promise<Citation[]>
  fetchUserDetails(): Promise<Details>
  visitAuthor(authorUrl: string): Promise<void>
}
