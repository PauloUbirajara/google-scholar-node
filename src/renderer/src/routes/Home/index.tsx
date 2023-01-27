import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Text, Input, Stack, useToast, Button } from "@chakra-ui/react";

function Home(): JSX.Element {
  const navigate = useNavigate();
  const toast = useToast();

  const submitSheet = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    if (!data) {
      toast({
        title: "Erro",
        description: "Não foi possível ler planilha",
        status: "error"
      });
      return;
    }
    navigate("/read-sheet", { state: data, replace: true });
  };

  return (
    <div className="home">
      <Center>
        <form onSubmit={submitSheet}>
          <Stack>
            <Text fontSize="xl" as="b">
              1) Definir Planilha
            </Text>
            <input
              type="file"
              id="sheet-input"
              name="sheet"
              accept=".csv, .xls, .xlsx"
              required
            />
            <Button mt={4} colorScheme="blue" type="submit">
              Enviar
            </Button>
          </Stack>
        </form>
      </Center>
    </div>
  );
}

export default Home;
