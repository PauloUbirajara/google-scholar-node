import { Citation } from "@renderer/types/citation.type";

export type UserCitations = {
  hIndex: number;
  i10Index: number;
  citations: Citation[];
};
