import { UserCitations } from "./userCitations.type";

export type FetchResults = {
  longestRows: number[];
  links: string[];
  results: UserCitations[];
};
