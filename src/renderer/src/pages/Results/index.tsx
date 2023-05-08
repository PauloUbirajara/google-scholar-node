import { Button, Stack, useBoolean, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WorkBook } from "xlsx";

import { NavBar } from "@renderer/components/NavBar";
import BaseTemplate from "@renderer/templates/base.template";
import { useResultSpreadsheet } from "@renderer/hooks/useResultSpreadsheet.hook";
import { FetchResults } from "@renderer/types/fetchResults.type";

function ResultsPage() {
  const showToast = useToast({ isClosable: true, title: "Resultados" });
  const { resultSheet, loadResults } = useResultSpreadsheet();
  const [canSave, setCanSave] = useBoolean(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResultsString = sessionStorage.getItem("fetchResults");
    const sheetString = sessionStorage.getItem("sheet");

    if (!fetchResultsString) return;
    if (!sheetString) return;

    // const fetchResults: { [link: string]: FetchResults } =
    const fetchResults: FetchResults = JSON.parse(fetchResultsString);
    const workbook: WorkBook = JSON.parse(sheetString);

    console.log("fetchresults", fetchResults);
    console.log("workbook", workbook);
    setCanSave.off();
    loadResults(workbook, fetchResults);
  }, []);

  useEffect(() => {
    if (resultSheet === null) return;
    console.log("resultSheet", resultSheet);
    setCanSave.on();
  }, [resultSheet]);

  const goHome = () => {
    navigate("/");
  };

  const saveResults = () => {
    if (!canSave) return;
    showToast({
      description: "Salvo com sucesso",
      status: "success"
    });
  };

  return (
    <BaseTemplate>
      <Stack spacing={2}>
        <NavBar title="Resultados" />
        <Button isLoading={!canSave} onClick={saveResults} colorScheme="green">
          Salvar
        </Button>
        <Button onClick={goHome}>Voltar ao início</Button>
      </Stack>
    </BaseTemplate>
  );
}

export default ResultsPage;
