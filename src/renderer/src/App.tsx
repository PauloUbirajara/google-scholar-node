import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { Stack } from "@chakra-ui/react";

import ErrorPage from "./pages/Error";
import FetchUsersPage from "./pages/FetchUsers";
import HomePage from "./pages/Home";
import ProcessPage from "./pages/ProcessSheet";
import ResultsPage from "./pages/Results";

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<HomePage />}></Route>
    <Route path="/process" element={<ProcessPage />} />
    <Route path="/fetch-users" element={<FetchUsersPage />} />
    <Route path="/results" element={<ResultsPage />} />
    <Route path="*" element={<ErrorPage />}></Route>
  </>
);

const router = createBrowserRouter(routes);

const App = (): JSX.Element => {
  return (
    <Stack spacing={2} padding={5} minHeight={"100%"}>
      <RouterProvider router={router} />
    </Stack>
  );
};

export default App;
