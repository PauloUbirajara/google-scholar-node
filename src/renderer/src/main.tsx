import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import "../styles/main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </QueryClientProvider>
);
