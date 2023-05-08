import { YEAR_COUNT } from "@renderer/constants";
import { Citation } from "@renderer/types/citation.type";
import { FetchResults } from "@renderer/types/fetchResults.type";
import { UserCitations } from "@renderer/types/userCitations.type";

function getDocumentFromHTML(html: string): Document {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");
  return document;
}

function getHIndex(html: string): number {
  try {
    const document = getDocumentFromHTML(html);
    const userInfo = document.querySelectorAll("tbody")[0];
    const hIndexInfo = userInfo.querySelectorAll("tr")[1];
    const hIndexValue = hIndexInfo.querySelectorAll("td")[1];
    const hIndex = parseInt(hIndexValue.textContent!);
    return hIndex;
  } catch (e) {
    console.warn("Could not retrieve HIndex");
    console.warn(e);
  }
  return 0;
}

function getI10Index(html: string): number {
  try {
    const document = getDocumentFromHTML(html);
    const userInfo = document.querySelectorAll("tbody")[0];
    const i10IndexInfo = userInfo.querySelectorAll("tr")[2];
    const i10IndexValue = i10IndexInfo.querySelectorAll("td")[1];
    const i10Index = parseInt(i10IndexValue.textContent!);
    return i10Index;
  } catch (e) {
    console.warn("Could not retrieve I10Index");
    console.warn(e);
  }
  return 0;
}

export function getHeader(): string[] {
  const hIndexHeader = "HIndex";
  const i10IndexHeader = "I10Index";

  const currentYear = new Date().getFullYear();
  const citationsHeaders = Array.from(Array(YEAR_COUNT))
    .map((_, i) => currentYear - i)
    .map((c) => `Citações - ${c}`);
  console.log(citationsHeaders);

  return [hIndexHeader, i10IndexHeader, ...citationsHeaders].map(toString);
}

export function getResultRow(results: UserCitations): string[] {
  const hIndexValue = results.hIndex;
  const i10IndexValue = results.i10Index;
  const currentYear = new Date().getFullYear();
  const citations = results.citations
    .filter((y) => y.year <= currentYear && y.year >= currentYear - YEAR_COUNT)
    .map((c) => c.value);
  return [hIndexValue, i10IndexValue, ...citations].map(toString);
}

function getCitations(html: string): Citation[] {
  try {
    const document = getDocumentFromHTML(html);
    const citationPlot = document.querySelector(".gsc_g_hist_wrp");
    const plotElements = citationPlot!.querySelector(".gsc_md_hist_b");

    const yearsElements = plotElements!.querySelectorAll(".gsc_g_t");
    const years = Array(...yearsElements).map((elem) =>
      parseInt(elem.textContent!)
    );

    const citationElements = plotElements!.querySelectorAll(".gsc_g_a");
    const citationValues = Array(...citationElements).map((elem) => ({
      index: Math.floor(+elem.style.right.replace("px", "") / 32),
      value: elem.textContent!
    }));

    const citations = citationValues.reduce(
      (totalCitations: Citation[], citationValue) => {
        const year = years[years.length - 1 - citationValue.index];
        const value = +citationValue.value;
        const citation: Citation = {
          year,
          value
        };
        return totalCitations.concat([citation]);
      },
      []
    );
    return citations;
  } catch (e) {
    console.warn("Could not retrieve citations");
    console.warn(e);
  }
  return [];
}

export function parseHTML(html: string | undefined): UserCitations {
  const userCitations: UserCitations = {
    hIndex: 0,
    i10Index: 0,
    citations: []
  };
  if (html === undefined) return userCitations;
  userCitations.hIndex = getHIndex(html);
  userCitations.i10Index = getI10Index(html);
  userCitations.citations = getCitations(html);
  return userCitations;
}

export function getEmptyArray(
  currentLength: number,
  expectedLength: number
): string[] {
  return Array(expectedLength - currentLength).fill("");
}
