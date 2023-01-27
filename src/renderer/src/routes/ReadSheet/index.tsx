import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Center, Progress, Stack, useToast, Text } from "@chakra-ui/react";

// import readSheetService from "@renderer/services/readSheet.service";
import readSheetService from "@renderer/services/LOCAL_readSheet.service";

function ReadSheet(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const sheet = location.state?.sheet;
    if (sheet === null || sheet === undefined) {
      toast({
        title: "Erro",
        description: "Não foi possível ler planilha enviada pelo usuário",
        status: "error"
      });
      navigate("/", { replace: true });
      return;
    }
    toast({
      title: "Ler planilha",
      description: "Foi iniciado o processo de leitura do processo",
      status: "info"
    });
    readSheetService
      .read(sheet)
      .then((sheetContent) => {
        navigate("/search-users", { state: sheetContent, replace: true });
      })
      .catch((e) => {
        console.warn(e);
        toast({
          title: "Erro",
          description: "Erro durante leitura de planilha",
          status: "error"
        });
        navigate("/", { replace: true });
      });
  }, []);

  return (
    <div className="read-sheet">
      <Center>
        <Stack>
          <Text fontSize="xl" as="b">
            2) Ler Planilha
          </Text>

          <p>Aguarde alguns instantes...</p>
          <Progress isIndeterminate colorScheme="blue" borderRadius={"xl"} />
        </Stack>
      </Center>
    </div>
  );
}

export default ReadSheet;
