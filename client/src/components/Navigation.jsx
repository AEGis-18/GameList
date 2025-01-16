import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div>
      <h1>
        <Link to="/games">Games</Link>
      </h1>
      <h1>
        <Link to="/list">List</Link>
      </h1>
      <hr />
    </div>
  );
}
