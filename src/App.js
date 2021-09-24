import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import { useState } from "react";
import AuthContext from "./context/auth-context";
import React from "react";
import { LocalSwal } from "shared/LocalSwal";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const loginHandler = (userData) => {
    console.log("saaa", userData);
    setUserData(userData);
    setAuthenticated(true);
  };
  const logoutHandler = () => {
    setUserData(null);
    setAuthenticated(false);
  };

  const addFood = (food) => {
    const currentItems = userData.cart;
    if (!currentItems) {
      setUserData({
        ...userData,
        cart: [
          {
            id: food.id,
            quantity: 1,
            price: food.price,
            name: food.name,
            photo_url: food.photo_url,
          },
        ],
      });
    } else {
      const isExisting = userData.cart.find((item) => {
        return item.id === food.id;
      });

      if (isExisting) {
        const newTotal = (isExisting.quantity += 1);
        const currentCart = userData.cart.filter((item) => {
          return item.id !== food.id;
        });
        setUserData({
          ...userData,
          cart: [
            ...currentCart,
            {
              id: food.id,
              quantity: newTotal,
              price: food.price,
              name: food.name,
              photo_url: food.photo_url,
            },
          ],
        });
      } else {
        setUserData({
          ...userData,
          cart: [
            ...userData.cart,
            {
              id: food.id,
              quantity: 1,
              price: food.price,
              name: food.name,
              photo_url: food.photo_url,
            },
          ],
        });
      }
      LocalSwal.fire({
        // title: "Success",
        text: `Added ${food.name} to cart`,
        icon: "success",
        toast: true,
        timer: 1500,
        position: "top-end",
      });
    }
    console.log(userData.cart);
  };

  const removeFood = (food, singleMode = false) => {
    const currentItems = userData.cart;
    if (!currentItems) {
      return;
    } else {
      const isExisting = userData.cart.find((item) => {
        return item.id === food.id;
      });

      if (isExisting) {
        const currentCart = userData.cart.filter((item) => {
          return item.id !== food.id;
        });
        if (!singleMode) {
          setUserData({
            ...userData,
            cart: [...currentCart],
          });
        } else {
          const newTotal = (isExisting.quantity -= 1);
          if (newTotal < 1) {
            setUserData({
              ...userData,
              cart: [...currentCart],
            });
          } else {
            setUserData({
              ...userData,
              cart: [
                ...currentCart,
                {
                  id: food.id,
                  quantity: newTotal,
                  price: food.price,
                  name: food.name,
                  photo_url: food.photo_url,
                },
              ],
            });
          }
        }
      }
      console.log(userData.cart);
    }
  };

  const clearCart = () => {
    setUserData({
      ...userData,
      cart: [],
    });

    console.log(userData.cart);
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{
          authenticated: authenticated,
          login: loginHandler,
          userData: userData,
          logout: logoutHandler,
          addToCart: addFood,
          emptyCart: clearCart,
          removeFromCart: removeFood,
        }}
      >
        <Header />
        <main className="container-fluid" style={{ minHeight: "90vh" }}>
          <AppRouter />
        </main>
        <Footer />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
