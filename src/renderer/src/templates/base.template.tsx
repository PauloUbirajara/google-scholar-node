import { Box, Divider, Heading, ScaleFade, Stack } from "@chakra-ui/react";

import NavBar from "@renderer/components/NavBar";

function BaseTemplate({ title, children }) {
  return (
    <ScaleFade in={true}>
      <Stack spacing={5}>
        <NavBar title={title} />
        <Divider></Divider>
        <Box>{children}</Box>
      </Stack>
    </ScaleFade>
  );
}

export default BaseTemplate;
