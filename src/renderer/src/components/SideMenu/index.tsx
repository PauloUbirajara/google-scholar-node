import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { routes } from "@renderer/routes";
import { FileMeta } from "@renderer/types/filemeta.type";

function SideMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const goToPage = (path: string) => {
    navigate(path);
  };

  let fileName: string | null = null;
  const fileMetadataString = sessionStorage.getItem("fileMetadata");
  if (fileMetadataString !== null) {
    const fileMetadata: FileMeta = JSON.parse(fileMetadataString);
    fileName = fileMetadata.name;
  }

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
              {fileName ? <Text>{fileName}</Text> : null}
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
