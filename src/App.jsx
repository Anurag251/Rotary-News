import React, { useEffect } from "react";
import { HeaderComponent } from "./components/Header.component";
import "./styles/main.sass";
import { HomePage } from "./pages/Home/Home.page";
import { Route, Routes, useLocation } from "react-router-dom";
import DetailsPage from "./pages/details/Details.page";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <HeaderComponent />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route exact path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
