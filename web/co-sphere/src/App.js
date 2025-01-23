import { useEffect } from "react";
import "./App.css";
import Router from "./router/Router";

function App() {
  useEffect(() => {
    return () => {
      document.body.style.zoom = "100%";
    };
  }, []);
  return <Router />;
}

export default App;
