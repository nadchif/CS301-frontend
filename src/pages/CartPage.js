import axios from "axios";
import { ENV_CONSTANTS } from "env";
import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { LocalSwal } from "shared/LocalSwal";
import { sumCartItems } from "shared/utils";
import AuthContext from "../context/auth-context";

export default function CartPage() {
  const authContext = useContext(AuthContext);
  const [isWorking, setIsWorking] = useState(false);
  const data =
    authContext.authenticated && authContext.userData
      ? authContext.userData.cart
      : [];

  const handleCheckout = async () => {
    setIsWorking(true);
    const url = `${ENV_CONSTANTS.apiUrl}/order`;
    try {
      const result = await axios.post(
        url,
        {
          order_data: data.map((entry) => ({
            id: entry.id,
            quantity: entry.quantity,
          })),
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authContext.userData.access_token}`,
          },
        }
      );
      LocalSwal.fire(
        "Order Received!",
        `Your tracking code is ${result.data.data.tracking} `,
        "success"
      );
      authContext.emptyCart();
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        LocalSwal.fire("Uh Oh", e.response.data.error, "error");
      } else {
        LocalSwal.fire(
          "Uh Oh",
          "An error occured. Please try again later",
          "error"
        );
      }
      console.error(e.response);
    }
    setIsWorking(false);
  };

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
          <button
            type="button"
            onClick={() => authContext.emptyCart()}
            className="btn btn-sm btn-danger ml-2"
          >
            Empty Cart
          </button>
        </div>
        {data && data.length > 0 ? (
          data
            .sort((a, b) => {
              return a.id - b.id;
            })
            .map((item) => (
              <div className="col-12 col-md-8 offset-md-2 my-3" key={item.id}>
                <div className="card rounded-0">
                  <div className="row no-gutters">
                    <div className="col-sm-5">
                      <img
                        style={{
                          height: "12rem",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        src={item.photo_url}
                        alt={item.name}
                      />
                    </div>
                    <div className="col-sm-7 ">
                      <div className="card-body">
                        <h5 className="card-title">
                          &#8369;{(item.price * item.quantity).toFixed(2)}
                        </h5>
                        <p className="card-text text-muted">
                          {item.quantity} x {item.name}{" "}
                        </p>
                        <button
                          type="button"
                          onClick={() => authContext.removeFromCart(item, true)}
                          className="btn btn-dark rounded-0"
                        >
                          -
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          onClick={() => authContext.addToCart(item)}
                          className="btn btn-dark rounded-0"
                        >
                          +
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          onClick={() => authContext.removeFromCart(item)}
                          className="btn btn-danger rounded-0"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="col-12 py-5 my-5 text-center">No items in cart</div>
        )}
        <div className="col-12 col-md-8 offset-md-2 my-3">
          <button
            className="btn btn-success btn-block btn-lg mb-5 rounded-0"
            type="button"
            disabled={isWorking || (data && data.length < 1)}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}
