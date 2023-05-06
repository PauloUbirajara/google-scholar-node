import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  ListItem,
  OrderedList,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import { To, useNavigate } from "react-router-dom";

const steps = [
  { title: "First", description: "Contact Info" },
  { title: "Second", description: "Date & Time" },
  { title: "Third", description: "Select Rooms" }
];

function SideMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const goToPage = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<HamburgerIcon />}
        aria-label={"side-menu"}
      />
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        colorScheme="blue"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Etapas</DrawerHeader>
          <DrawerBody>
            <Stack>
              <Button onClick={() => goToPage("/")}>Início</Button>
              <Button onClick={() => goToPage("/process")}>
                Processar planilha
              </Button>
              <Button onClick={() => goToPage("/fetch-users")}>
                Buscar usuários
              </Button>
              <Button onClick={() => goToPage("/results")}>Resultados</Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideMenu;
