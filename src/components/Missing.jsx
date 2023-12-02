import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div className="container">
      <div className="my-4 py-3">
        <h1>Not Found</h1>
        <p>The page you're looking for is not here; return <Link to="/">to the homepage.</Link></p>
      </div>
    </div>
  );
}

export default Missing;