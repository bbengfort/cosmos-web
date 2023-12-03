import { Link } from "react-router-dom";

const Missing = () => {

  return (
    <div className="container">
      <div className="my-4 py-3 text-center">
        <img class="img-fluid" alt="404 Page Not Found" src="/404.png?url" />
        <h1>Page Not Found!</h1>
        <p className="fs-4">The page you're looking for is not here.</p>
        <div>
          <Link to="/" className="btn btn-primary">Homepage</Link>
        </div>
      </div>
    </div>
  );
}

export default Missing;