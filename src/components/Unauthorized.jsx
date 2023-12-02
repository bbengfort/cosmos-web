import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className="container">
      <div className="my-4 py-3">
        <h1>Not Authorized</h1>
        <p>You do not have permission to access this page</p>
        <button className="btn btn-primary" onClick={goBack}>Go Back</button>
      </div>
    </div>
  );
}

export default Unauthorized;