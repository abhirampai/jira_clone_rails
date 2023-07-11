import React, { useEffect, useState } from "react";

import { Layout } from "antd";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import Main from "components/Main";
import NavBar from "components/Navbar/Navbar";

import queryClient from "./queryClient";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Layout hasSider className="min-h-screen">
        <Router>
          <NavBar />
          <Layout>
            <Switch>
              <Route exact path="/" render={() => <Main />} />
              <Route exact path="/about" render={() => <div>About</div>} />
            </Switch>
          </Layout>
        </Router>
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
