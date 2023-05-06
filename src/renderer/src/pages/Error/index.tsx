import { Button, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import BaseTemplate from "@renderer/templates/base.template";

function ErrorPage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <BaseTemplate title="Erro">
      <Stack>
        <Button onClick={goHome}>Voltar ao início</Button>
      </Stack>
    </BaseTemplate>
  );
}

export default ErrorPage;
