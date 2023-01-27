import { HashRouter, Routes, Route } from "react-router-dom";
import { Stack } from "@chakra-ui/react";

import Home from "@renderer/routes/Home";
import ReadSheet from "@renderer/routes/ReadSheet";
import SearchUsers from "@renderer/routes/SearchUsers";
import FormatToSheet from "@renderer/routes/FormatToSheet";
import Results from "@renderer/routes/Results";

const App = (): JSX.Element => {
  return (
    <HashRouter>
      <Stack spacing={2} padding={5} minHeight={"100vh"}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/read-sheet" element={<ReadSheet />}></Route>
          <Route path="/search-users" element={<SearchUsers />}></Route>
          <Route path="/format-to-sheet" element={<FormatToSheet />}></Route>
          <Route path="/results" element={<Results />}></Route>
        </Routes>
      </Stack>
    </HashRouter>
  );
};

export default App;
