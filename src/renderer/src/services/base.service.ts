import { Citation } from '@renderer/types/citation.type'
import { Details } from '@renderer/types/details.type'

export interface BaseService {
  abortPendingRequests(): void
  fetchUserCitations(): Promise<Citation[]>
  fetchUserDetails(): Promise<Details>
  visitAuthor(authorUrl: string): Promise<void>
}
