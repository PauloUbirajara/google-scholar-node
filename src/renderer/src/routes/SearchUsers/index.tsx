import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useToast,
  Progress,
  Stack,
  Center,
  Text,
  Divider
} from "@chakra-ui/react";

import getUserDetailsService from "@renderer/services/LOCAL_getUserDetails.service";
import { getFirstValidURL, INTERVAL_BETWEEN_REQUESTS } from "./util";
import { SheetDetails } from "@renderer/models/SheetDetails";
import { SheetPage } from "@renderer/types/sheetPage.type";

function SearchUsers(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [progress, setProgress] = useState(0.0);

  const pages = location.state;

  if (pages === null || pages === undefined) {
    toast({
      title: "Erro",
      description:
        "Não foi possível ler dados coletados para buscar os pesquisadores",
      status: "error"
    });
    navigate("/", { replace: true });
  }

  const maxProgress: number = pages
    .map((p: SheetPage) => p.matrix.length)
    .reduce((sum: number, current: number) => sum + current);

  useEffect(() => {
    toast({
      title: "Buscar dados de pesquisadores",
      description:
        "Foi iniciado o processo de busca de dados de pesquisadores a partir de planilha",
      status: "info"
    });

    (async (): Promise<void> => {
      try {
        const sheetDetails = new SheetDetails(pages);
        for (const page of sheetDetails.pages) {
          for (const row of page.matrix) {
            try {
              const url = getFirstValidURL(row);
              const html = await getUserDetailsService.fetchHTML(url);
              const data = await getUserDetailsService.get(html);
              await new Promise((resolve) =>
                setTimeout(resolve, INTERVAL_BETWEEN_REQUESTS)
              );
              row.push(JSON.stringify(data));
            } catch (e) {
              console.warn(
                "Não foi possível obter URL nessa linha, continuando"
              );
              console.warn(e);
            } finally {
              setProgress((p) => p + 1);
            }
          }
        }
        navigate("/format-to-sheet", { state: sheetDetails, replace: true });
      } catch (e) {
        console.warn(e);
        toast({
          title: "Erro",
          description: "Erro durante coleta de dados de pesquisadores",
          status: "error"
        });
        navigate("/", { replace: true });
      }
    })();
  }, []);

  const formattedProgress =
    maxProgress > 0 ? (progress / maxProgress) * 100.0 : 0;

  return (
    <div className="search-users">
      <Center>
        <Stack>
          <Text fontSize="xl" as="b">
            3) Coletar dados de pesquisadores
          </Text>

          <p>
            Há um intervalo de {INTERVAL_BETWEEN_REQUESTS / 1000}s entre
            pesquisadores
          </p>
          <Divider />
          <p>{formattedProgress.toFixed(2)}%</p>
          <Progress
            hasStripe
            value={formattedProgress}
            colorScheme="blue"
            borderRadius={"xl"}
          />
        </Stack>
      </Center>
    </div>
  );
}

export default SearchUsers;
