import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/auth-context";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const loginHandler = ({ username, password }) => {
    alert(username);
  };
  return (
    <Router>
      <AuthContext.Provider
        value={{
          authenticated: authenticated,
          login: loginHandler,
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
