import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Progress, useToast, Text, Center, Stack } from "@chakra-ui/react";

import formatDetailsToSheetService from "@renderer/services/formatDetailsToSheet.service";

function FormatToSheet(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const pages = location.state?.pages;
    if (pages === null || pages === undefined) {
      toast({
        title: "Erro",
        description:
          "Não foi possível formatar dados coletados para uma planilha final",
        status: "error"
      });
      navigate("/", { replace: true });
      return;
    }
    toast({
      title: "Salvar dados coletados em planilha",
      description:
        "Foi iniciado o processo de salvar todos os dados coletados em uma planilha",
      status: "info"
    });
    const details = formatDetailsToSheetService.appendHeaders(pages);
    const formattedPages = formatDetailsToSheetService.parseRows(details);
    details.pages = formattedPages;
    navigate("/results", { state: details, replace: true });
  }, []);

  return (
    <div className="format-to-sheet">
      <Center>
        <Stack>
          <Text fontSize="xl" as="b">
            4) Organizando dados coletados para uma nova planilha
          </Text>

          <p>Aguarde alguns instantes...</p>
          <Progress isIndeterminate colorScheme="blue" borderRadius={"xl"} />
        </Stack>
      </Center>
    </div>
  );
}

export default FormatToSheet;
