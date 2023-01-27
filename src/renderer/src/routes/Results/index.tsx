import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text, Button, Center, Stack, useToast } from "@chakra-ui/react";

import { SheetDetails } from "@renderer/models/SheetDetails";
import saveResultService from "@renderer/services/saveResult.service";

function Results(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const pages = location.state?.pages;

  useEffect(() => {
    if (pages === null || pages === undefined) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar dados formatados",
        status: "error"
      });
      navigate("/", { replace: true });
      return;
    }

    toast({
      title: "Dados formatados",
      description: "Dados formatados e prontos para baixar",
      status: "info"
    });
  }, [pages]);

  function saveResult(e): void {
    e.preventDefault();
    if (!pages) return;

    try {
      const details = new SheetDetails(pages);
      const workbook = saveResultService.loadResultIntoWorkbook(details);
      saveResultService.askToDownload(workbook);
      toast({
        title: "Salvar",
        description: "Os dados foram salvos com sucesso",
        status: "success"
      });
    } catch (e) {
      toast({
        title: "Erro",
        description: "Erro ao salvar dados formatados em planilha final",
        status: "error"
      });
    }
  }

  return (
    <div className="results">
      <Center>
        <Stack>
          <Text fontSize="xl" as="b">
            5) Resultado
          </Text>

          <Button mt={4} colorScheme="green" onClick={saveResult}>
            Salvar planilha com dados
          </Button>
        </Stack>
      </Center>
    </div>
  );
}

export default Results;
