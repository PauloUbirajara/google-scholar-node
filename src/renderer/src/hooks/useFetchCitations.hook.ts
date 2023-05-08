import { useQueries } from "@tanstack/react-query";

export function useFetchCitations(sheetLinks: string[]) {
  const fetchLinkData = async (link: string) => {
    const response = await fetch(link);
    const data = await response.text();
    return data;
  };

  const queries = sheetLinks.map((link) => ({
    queryKey: ["user-text", link],
    queryFn: () => fetchLinkData(link),
    retryDelay: 60000,
    retry: true
  }));
  const results = useQueries({ queries: queries });
  return results;
}
