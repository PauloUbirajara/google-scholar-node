import { GetUserDetailsInterface } from "@renderer/interface/getUserDetails.interface";
import { FetchOptions } from "@renderer/types/fetchOptions.type";
import { UserDetails } from "@renderer/types/userDetails.type";

const USER_API_URL = "https://scholar-api.vercel.app/api";

class GetUserDetailsService implements GetUserDetailsInterface {
  private getFetchOptions(html: string): FetchOptions {
    const method = "POST";
    const headers = { "Content-Type": "text/plain" };
    const body = html;
    return { body, method, headers };
  }

  async fetchHTML(url: string): Promise<string> {
    const response = await fetch(url);

    if (!response.ok)
      throw new Error("Não foi possível obter página HTML do pesquisador");

    const html = await response.text();
    return html;
  }

  async get(html: string): Promise<UserDetails> {
    const response = await fetch(
      `${USER_API_URL}/get`,
      this.getFetchOptions(html)
    );

    if (!response.ok)
      throw new Error(
        "Não foi possível obter detalhes de pesquisador a partir de página HTML"
      );

    const contents: UserDetails = await response.json();
    return contents;
  }
}

export default new GetUserDetailsService();
