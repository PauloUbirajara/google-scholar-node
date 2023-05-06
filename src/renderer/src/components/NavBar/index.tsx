import { Heading, Stack, Text } from "@chakra-ui/react";
import SideMenu from "../SideMenu";

export type NavBarProps = {
  title: string;
};

export function NavBar(props: NavBarProps) {
  const { title } = props;
  return (
    <Stack direction={"row"} align={"center"}>
      <SideMenu />
      <Heading>{title}</Heading>
    </Stack>
  );
}
