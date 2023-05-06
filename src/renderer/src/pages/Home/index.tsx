import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  Input,
  Stack
} from "@chakra-ui/react";
import { Form, useNavigate } from "react-router-dom";
import { FormikValues, useFormik } from "formik";

import BaseTemplate from "@renderer/templates/base.template";
import { NavBar } from "@renderer/components/NavBar";

const supportedExtensions = [".xlsx", ".xls", ".csv"];

function HomePage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { file: `` },
    onSubmit: (values: FormikValues) => {
      try {
        const { file } = values;
        formik.setSubmitting(true);

        if (!Boolean(file)) {
          throw new Error("Não foi fornecido um arquivo");
        }

        const isSupported = supportedExtensions.reduce(
          (result, extension) => file.endsWith(extension) || result,
          false
        );
        if (!isSupported) {
          throw new Error("Tipo de arquivo não suportado");
        }

        sessionStorage.setItem("file", file);
        formik.setSubmitting(false);
        navigate("/read-sheet");
      } catch (e: any) {
        formik.setErrors({ file: e.message });
      } finally {
        formik.setSubmitting(false);
      }
    }
  });

  return (
    <BaseTemplate>
      <Stack spacing={2}>
        <NavBar title="Início" />
        <Divider />
        <Form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <FormControl isInvalid={formik.touched && !formik.errors?.file}>
              <Input
                type="file"
                multiple={false}
                name={`file`}
                value={formik.values.file}
                onChange={formik.handleChange}
                accept={supportedExtensions.join(",")}
                padding={1}
              ></Input>
              <FormErrorMessage>{formik.errors.file}</FormErrorMessage>
            </FormControl>
            <Button type="submit" isLoading={formik.isSubmitting}>
              Carregar
            </Button>
          </Stack>
        </Form>
      </Stack>
    </BaseTemplate>
  );
}

export default HomePage;
