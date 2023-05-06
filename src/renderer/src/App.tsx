import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { Stack } from "@chakra-ui/react";

import ErrorPage from "./pages/Error";
import { routes } from "./routes";

const availableRoutes = createRoutesFromElements(
  <>
    {routes.map((route, index) => (
      <Route
        key={`route-${index}`}
        path={route.path}
        element={route.component}
      ></Route>
    ))}
    <Route path="*" element={<ErrorPage />}></Route>
  </>
);

const router = createBrowserRouter(availableRoutes);

const App = (): JSX.Element => {
  return (
    <Stack spacing={2} padding={5} minHeight={"100%"}>
      <RouterProvider router={router} />
    </Stack>
  );
};

export default App;
