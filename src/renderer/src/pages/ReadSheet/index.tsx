import { Divider, Progress, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NavBar } from "@renderer/components/NavBar";
import { useSpreadsheet } from "@renderer/hooks/useSpreadsheet.hook";
import BaseTemplate from "@renderer/templates/base.template";

function ReadSheetPage() {
  const { workbookString, handleFile, progress } = useSpreadsheet();
  const dataURL = sessionStorage.getItem("file");
  let readTimeout: NodeJS.Timeout;
  const navigate = useNavigate();

  handleFile(dataURL);

  const hasReadSheet = workbookString && progress === 100;
  useEffect(() => {
    if (progress !== 100) {
      return;
    }

    clearTimeout(readTimeout);
    setTimeout(() => {
      sessionStorage.setItem("sheet", workbookString);
      navigate("/fetch-users");
    }, 2000);
  }, [progress]);

  return (
    <BaseTemplate>
      <Stack spacing={2}>
        <NavBar title="Ler planilha" />
        <Divider />
        <Text>
          {hasReadSheet
            ? "Leitura da planilha completa, iniciando busca por usuários"
            : `Lendo planilha: ${progress.toFixed(2)} %`}
        </Text>
        <Progress
          value={progress}
          hasStripe={true}
          rounded={"md"}
          colorScheme={hasReadSheet ? "green" : "blue"}
        ></Progress>
      </Stack>
    </BaseTemplate>
  );
}

export default ReadSheetPage;
