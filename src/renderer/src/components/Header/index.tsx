import { Link } from "react-router-dom";

function Header(): JSX.Element {
  return (
    <nav>
      <Link to="/">home</Link>
      <Link to="/read-sheet">ler planilha</Link>
      <Link to="/search-users">procurar pessoas</Link>
      <Link to="/format-to-sheet">formatar para planilha</Link>
      <Link to="/results">resultados</Link>
    </nav>
  );
}
export default Header;
