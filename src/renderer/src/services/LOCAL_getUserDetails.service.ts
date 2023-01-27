import {
  getDetailsFromDocument,
  getUserCitationsFromDocument
} from "@renderer/helpers/scholar.helper";
import { GetUserDetailsInterface } from "@renderer/interface/getUserDetails.interface";
import { UserDetails } from "@renderer/types/userDetails.type";

class LocalGetUserDetailsService implements GetUserDetailsInterface {
  async fetchHTML(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Não foi possível buscar perfil de pesquisador ${url}`);
    }
    const html = await response.text();
    return html;
  }

  async get(html: string): Promise<UserDetails> {
    const data: UserDetails = {
      details: { hindex: "0", i10index: "0", id: "", name: "" },
      citations: []
    };

    const document = new DOMParser().parseFromString(html, "text/html");

    data.details = getDetailsFromDocument(document);
    data.citations = getUserCitationsFromDocument(document);

    return data;
  }
}

export default new LocalGetUserDetailsService();
