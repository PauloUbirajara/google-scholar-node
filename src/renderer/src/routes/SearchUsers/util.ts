const SCHOLAR_URL_REGEX = /^https:\/\/scholar\.google\.com(\.br)?\/citations/;
export const INTERVAL_BETWEEN_REQUESTS = 15000;

export function getFirstValidURL(row: string[]): string {
  const validUrl = row.find((v) => v.match(SCHOLAR_URL_REGEX));

  if (validUrl === undefined)
    throw new Error("Não foi possível obter url de linha");

  const url = new URL(validUrl);
  const query = url.searchParams;
  const userID = query.get("user");

  if (userID === undefined || userID === null)
    throw new Error("Não foi possível verificar ID de pesquisador em URL");

  return validUrl;
}
