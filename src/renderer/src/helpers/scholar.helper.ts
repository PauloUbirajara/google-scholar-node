function getNameFromDocument(document: Document): string {
  let name = "<Sem Nome>";

  try {
    const nameElement = document.querySelector("#gsc_prf_in");
    name = nameElement!.textContent!;
  } catch (e) {
    console.warn("Não foi possível obter nome de pesquisador");
    console.warn(e);
  }

  return name;
}

function getUserIDFromDocument(document: Document): string {
  let userId = "<Sem ID>";

  try {
    const idElements = document.querySelectorAll("link");
    const userLink = Array.from(idElements).find((e) => e.rel === "canonical");
    const url = new URL(userLink!.href);
    const query = url.searchParams;
    const user = query.get("user");
    userId = user!;
  } catch (e) {
    console.warn("Não foi possível obter ID de pesquisador");
    console.warn(e);
  }

  return userId;
}

function getHIndexFromDocument(document: Document): string {
  let hIndex = "0";

  try {
    const allDetailsValues = document.querySelectorAll(".gsc_rsb_std");
    const hIndexElement = allDetailsValues[2];
    hIndex = hIndexElement.textContent!;
  } catch (e) {
    console.warn("Erro ao buscar h-index de pesquisador");
    console.warn(e);
  }

  return hIndex;
}

function getI10IndexElementFromDocument(document: Document): string {
  let i10Index = "0";

  try {
    const allDetailsValues = document.querySelectorAll(".gsc_rsb_std");
    const i10IndexElement = allDetailsValues[4];
    i10Index = i10IndexElement.textContent!;
  } catch (e) {
    console.warn("Não foi possível obter i10index de pesquisador");
    console.warn(e);
  }

  return i10Index;
}

function getDetailsFromDocument(document: Document): {
  name: string;
  id: string;
  hindex: string;
  i10index: string;
} {
  const details = { name: "", id: "", hindex: "0", i10index: "0" };
  const expectedAttributes = ["name", "id", "hindex", "i10index"];
  const expectedParsers = [
    getNameFromDocument,
    getUserIDFromDocument,
    getHIndexFromDocument,
    getI10IndexElementFromDocument
  ];

  expectedAttributes.forEach((key, index) => {
    try {
      details[key] = expectedParsers[index](document);
    } catch (e) {
      const error = "Houve algum erro ao definir detalhe";
      console.warn(error);
    }
  });

  return details;
}

function getYearsFromDocument(document: Document): string[] {
  const years = Array(100).fill(undefined);

  try {
    const citationContainer = document.querySelector(".gsc_md_hist_b");
    const totalYears = citationContainer!.querySelectorAll(".gsc_g_t");

    for (const yearElement of totalYears) {
      if (!yearElement) {
        console.warn(`Não foi possível obter ano do ${yearElement}`);
        continue;
      }

      const right = +yearElement["style"].right.match(/[0-9]+/)[0];
      const index = (right / 32) >> 0;
      const year = yearElement.textContent;
      years[index] = year;
    }
  } catch (e) {
    console.warn("Não foi possível obter anos de citações do pesquisador");
    console.warn(e);
  }

  return years;
}

function getCitationsFromDocument(document: Document): number[] {
  // Criar vetor com 100 posições para garantir a posição correta
  const citations = Array(100).fill(0);

  try {
    const citationContainer = document.querySelector(".gsc_md_hist_b");
    const totalCitations = Array.from(
      citationContainer!.querySelectorAll(".gsc_g_a")
    );

    for (const c of totalCitations) {
      const index = +c["style"].zIndex - 1;
      const content = c?.textContent || 0;
      citations[index] = +content;
    }
  } catch (e) {
    console.warn("Não foi possível obter valores de citações de pesquisador");
    console.warn(e);
  }

  return citations;
}

function getUserCitationsFromDocument(
  document: Document
): { year: string; citations: number }[] {
  const data: { year: string; citations: number }[] = [];

  try {
    const allYears = getYearsFromDocument(document);
    const allCitations = getCitationsFromDocument(document);

    for (let i = 0; i < allYears.length; i++) {
      const year = allYears[i];
      if (year === undefined || year === null) continue;
      const citations = allCitations[i];
      if (citations === undefined || citations === null) continue;
      data.push({ year, citations });
    }
  } catch (e) {
    console.warn("Não foi possível obter citações de pesquisador");
    console.warn(e);
  }

  return data;
}

export {
  getCitationsFromDocument,
  getDetailsFromDocument,
  getHIndexFromDocument,
  getI10IndexElementFromDocument,
  getNameFromDocument,
  getUserCitationsFromDocument,
  getUserIDFromDocument,
  getYearsFromDocument
};
