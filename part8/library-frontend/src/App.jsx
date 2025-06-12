import { NavLink, Outlet } from "react-router";
import "./App.css";

const App = () => {
  return (
    <div>
      <div className="navigation">
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/authors">Authors</NavLink>
        <NavLink to="/add">Add book</NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
