import { UserDetails } from "@renderer/types/userDetails.type";

export interface GetUserDetailsInterface {
  fetchHTML(url: string): Promise<string>;
  get(html: string): Promise<UserDetails>;
}
