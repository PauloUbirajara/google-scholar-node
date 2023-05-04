import { HashRouter, Routes, Route } from "react-router-dom";
import { Stack } from "@chakra-ui/react";

import HomePage from "./pages/Home";

const App = (): JSX.Element => {
  return (
    <HashRouter>
      <Stack spacing={2} padding={5} minHeight={"100%"}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Stack>
    </HashRouter>
  );
};

export default App;
