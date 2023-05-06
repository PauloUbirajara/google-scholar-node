import { createElement } from "react";
import FetchUsersPage from "./pages/FetchUsers";
import HomePage from "./pages/Home";
import ReadSheetPage from "./pages/ReadSheet";
import ResultsPage from "./pages/Results";

export const routes = [
  { path: "/", name: "Início", component: createElement(HomePage) },
  {
    path: "/read-sheet",
    name: "Ler planilha",
    component: createElement(ReadSheetPage)
  },
  {
    path: "/fetch-users",
    name: "Buscar usuários",
    component: createElement(FetchUsersPage)
  },
  {
    path: "/results",
    name: "Resultados",
    component: createElement(ResultsPage)
  }
];
