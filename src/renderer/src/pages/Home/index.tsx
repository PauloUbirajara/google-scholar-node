import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack
} from "@chakra-ui/react";
import { Form, useNavigate } from "react-router-dom";
import { FormikValues, useFormik } from "formik";

import BaseTemplate from "@renderer/templates/base.template";

function HomePage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { file: `` },
    onSubmit: (values: FormikValues) => {
      if (!Boolean(values.file)) {
        formik.getFieldHelpers("file").setError("No file!");
        return;
      }
      navigate("/process");
    }
  });

  const getResults = () => {
    navigate("/results");
  };

  return (
    <BaseTemplate title="Início">
      <Form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <Input
            type="file"
            multiple={false}
            name={`file`}
            value={formik.values.file}
            onChange={formik.handleChange}
            padding={1}
          ></Input>
          <Button type="submit" isLoading={formik.isSubmitting}>
            Carregar
          </Button>
        </Stack>
      </Form>
    </BaseTemplate>
  );
}

export default HomePage;
