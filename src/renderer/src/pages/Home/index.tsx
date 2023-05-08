import { Button, Divider, Input, Stack, useBoolean } from "@chakra-ui/react";
import { Form, useNavigate } from "react-router-dom";
import { useRef } from "react";

import BaseTemplate from "@renderer/templates/base.template";
import { NavBar } from "@renderer/components/NavBar";
import { saveFileInSessionStorage } from "@renderer/helpers/file.helper";

const supportedExtensions = [".xlsx", ".xls", ".csv"];

function HomePage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useBoolean(false);
  let submitTimeout: NodeJS.Timeout;

  function selectFile(e) {
    e.preventDefault();
    if (!fileRef.current) return;
    const selectedFile = fileRef.current.files?.item(0);
    if (!selectedFile) return;

    clearTimeout(submitTimeout);

    setLoading.on();

    submitTimeout = setTimeout(() => {
      setLoading.off();
      saveFileInSessionStorage(selectedFile);
      navigate("/read-sheet");
    }, 1500);
  }

  return (
    <BaseTemplate>
      <Stack spacing={2}>
        <NavBar title="Início" />
        <Divider />
        <Form>
          <Stack spacing={2}>
            <Input
              type="file"
              multiple={false}
              id="file"
              ref={fileRef}
              name="file"
              accept={supportedExtensions.join(",")}
              padding={1}
            ></Input>
            <Button onClick={selectFile} isLoading={loading}>
              Selecionar
            </Button>
          </Stack>
        </Form>
      </Stack>
    </BaseTemplate>
  );
}

export default HomePage;
