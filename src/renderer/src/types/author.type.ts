import { Citation } from '@renderer/types/citation.type'
import { Details } from '@renderer/types/details.type'

export type Author = {
  details: Details
  citations: Citation[]
}
