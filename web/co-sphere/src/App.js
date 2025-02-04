import { useEffect, useState } from "react";
import "./App.css";
import Router from "./router/Router";
import { getToken } from "./service/TokenService";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return <Router auth={isAuthenticated} />;
}

export default App;
