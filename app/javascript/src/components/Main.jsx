import React from "react";

import NavBar from "./Navbar/Navbar";

const Main = () => {
  const isAuthenticated = false;

  return <NavBar isAuthenticated={isAuthenticated} />;
};

export default Main;
