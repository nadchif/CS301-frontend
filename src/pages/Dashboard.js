import axios from "axios";
import { ENV_CONSTANTS } from "env";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { LocalSwal } from "shared/LocalSwal";
import { sumCartItems } from "shared/utils";
import AuthContext from "../context/auth-context";
import { countCartItems } from "../shared/utils";

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const [isWorking, setIsWorking] = useState(false);
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    setIsWorking(true);
    const url = `${ENV_CONSTANTS.apiUrl}/foods`;

    const fetchFoods = async () => {
      try {
        const result = await axios.get(url);
        setFoods(result.data.data);
      } catch (e) {
        if (e.response.data.error) {
          LocalSwal.fire("Uh Oh", e.response.data.error, "error");
        } else {
          LocalSwal.fire(
            "Uh Oh",
            "An error occured. Please try again later",
            "error"
          );
        }
        console.error("api error", e.response);
      }
      setIsWorking(false);
    };

    fetchFoods();
  }, []);

  return authContext.authenticated ? (
    <div style={{ minHeight: "80vh" }}>
      <div className="row">
        <div className="col-12 bg-light p-3 mb-4 text-right ">
          Total: &#8369;
          <span className="text-danger font-weight-bold">
            {authContext.userData.cart
              ? sumCartItems(authContext.userData.cart).toFixed(2)
              : "0.00"}{" "}
          </span>
          {/* <button
            type="button"
            onClick={() => authContext.emptyCart()}
            className="btn btn-sm btn-danger ml-2"
          >
            Empty Cart
          </button> */}
        </div>
        {foods.map((food) => (
          <div className="col-12 col-md-6 my-3" key={food.id}>
            <div className="card rounded-0">
              <div className="row no-gutters">
                <div className="col-sm-5">
                  <img
                    style={{
                      height: "12rem",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={food.photo_url}
                    alt={food.name}
                  />
                </div>
                <div className="col-sm-7">
                  <div className="card-body">
                    <h5 className="card-title">
                      &#8369;{food.price.toFixed(2)}
                    </h5>
                    <p className="card-text">{food.name}</p>
                    <button
                      type="button"
                      onClick={() => authContext.addToCart(food)}
                      className="btn btn-success rounded-0"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}
