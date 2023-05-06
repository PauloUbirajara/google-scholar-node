import { Heading, Stack } from "@chakra-ui/react";
import SideMenu from "../SideMenu";

function NavBar({ title }) {
  return (
    <Stack direction={"row"} align={"center"}>
      <SideMenu />
      <Heading>{title}</Heading>
    </Stack>
  );
}

export default NavBar;
