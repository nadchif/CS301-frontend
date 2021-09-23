import React from "react";

export default function LoginPage() {
  return (
    <div
      className=" bg-dark row d-flex justify-content-center flex-column"
      style={{
        height: "90vh",
        backgroundImage:
          "url(https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?cs=srgb&dl=pexels-rajesh-tp-1624487.jpg&fm=jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="row">
        <div className="col-12 col-md-4 offset-md-4 p-4  bg-light">
          <h3 className="pb-3">Sign In</h3>
          <p>
            <small>
              Welcome to <span className="text-danger">Kra&lt;ings</span>. Login
              to continue
            </small>
          </p>
          <form>
            <div className="form-group w-100">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                required
                className="form-control mb-2"
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                required
                className="form-control mb-2"
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-block btn-warning">
                Login
              </button>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-block btn-link">
                No Account? Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
