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
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { routes } from "@renderer/routes";
import { ButtonHTMLAttributes, MouseEventHandler, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function SideMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const goToPage = (path: string) => {
    navigate(path);
  };

  const selectedFile = useMemo(() => sessionStorage.getItem("file"), []);

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
              {selectedFile ? <Text>{selectedFile}</Text> : null}
              {routes.map((route, index) => (
                <Button
                  key={`sidemenu-button-${index}`}
                  onClick={() => goToPage(route.path)}
                >
                  {route.name}
                </Button>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideMenu;
