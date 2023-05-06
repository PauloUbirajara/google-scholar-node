import { ScaleFade } from "@chakra-ui/react";

function BaseTemplate({ children }) {
  return <ScaleFade in={true}>{children}</ScaleFade>;
}

export default BaseTemplate;
