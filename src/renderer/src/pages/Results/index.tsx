import { Button, Heading, Stack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import BaseTemplate from "@renderer/templates/base.template";

function ResultsPage() {
  const navigate = useNavigate();
  const showToast = useToast({ isClosable: true, title: "Resultados" });

  const goHome = () => {
    navigate("/");
  };

  const saveResults = () => {
    showToast({
      description: "Salvo com sucesso",
      status: "success"
    });
  };

  return (
    <BaseTemplate title="Resultados">
      <Stack>
        <Button onClick={saveResults} colorScheme="green">
          Salvar
        </Button>
        <Button onClick={goHome}>Voltar ao início</Button>
      </Stack>
    </BaseTemplate>
  );
}

export default ResultsPage;
