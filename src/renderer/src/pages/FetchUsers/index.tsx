import { Divider, Progress, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NavBar } from "@renderer/components/NavBar";
import { useFetchCitations } from "@renderer/hooks/useFetchCitations.hook";
import { useParseRows } from "@renderer/hooks/useParseRows.hook";
import { parseHTML } from "@renderer/helpers/user.helper";
import BaseTemplate from "@renderer/templates/base.template";

function FetchUsersPage() {
  const { links, longestRows, readWorkbook } = useParseRows();
  const sheet = sessionStorage.getItem("sheet");
  let fetchTimeout: NodeJS.Timeout;
  const navigate = useNavigate();

  useEffect(() => {
    if (!sheet) return;
    const workbook = JSON.parse(sheet);
    readWorkbook(workbook);
  }, []);

  useEffect(() => {
    if (!links.length) return;
    if (!longestRows.length) return;

    console.log("links, longestRows", links, longestRows);
  }, [links, longestRows]);

  const results = useFetchCitations(links);

  useEffect(() => {
    if (!results.length) return;
    console.log("results", results);
    console.log(
      "parse",
      results.map((result) => parseHTML(result.data))
    );
  }, [results]);

  const canCalculateProgress = links.length && results.length;
  const hasFetchUsers = canCalculateProgress && links.length === results.length;

  const progress = canCalculateProgress
    ? Math.floor(
        results.filter((elem) => elem.status === "success").length /
          links.length
      ) * 100
    : 0;

  useEffect(() => {
    if (progress !== 100) return;

    clearTimeout(fetchTimeout);
    if (!(results.map((r) => r.status === "success").length === links.length))
      return;

    // const parsedResults = {};
    // results.forEach((res, i) => {
    //   const linkString = links[i] as string;
    //   parsedResults[linkString] = parseHTML(res.data);
    // });
    const parsedResults = results.map(res => parseHTML(res.data))

    fetchTimeout = setTimeout(() => {
      const fetchResults = JSON.stringify({
        longestRows,
        links,
        results: parsedResults
      });
      sessionStorage.setItem("fetchResults", fetchResults);
      navigate("/results");
    }, 2000);
  }, [progress]);

  return (
    <BaseTemplate>
      <Stack spacing={2}>
        <NavBar title="Buscar usuários" />
        <Divider />
        <Text>
          {hasFetchUsers
            ? "Busca de usuários completa, buscando por dados de citações"
            : `Buscando usuários: ${progress.toFixed(2)}`}
        </Text>
        <Progress
          value={progress}
          hasStripe={true}
          rounded={"md"}
          colorScheme={hasFetchUsers ? "green" : "blue"}
        ></Progress>
      </Stack>
    </BaseTemplate>
  );
}

export default FetchUsersPage;
