import React, { useEffect, useState } from "react";

import { Layout, Spin } from "antd";
import { either, isEmpty, isNil } from "ramda";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import PrivateRoute from "common/PrivateRoute";
import Login from "components/Authentication/Login";
import Signup from "components/Authentication/Signup";
import Main from "components/Main";
import useLocalStorage from "hooks/useLocalStorage";

import queryClient from "./queryClient";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [authToken] = useLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <Spin size="large" tip="Loading">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Layout hasSider className="min-h-screen">
        <Router>
          {/* <NavBar /> */}
          <Layout className="pl-5 pr-6">
            <Switch>
              <Route exact path="/signup" render={() => <Signup />} />
              <Route exact path="/login" render={() => <Login />} />
              <PrivateRoute
                component={Main}
                condition={isLoggedIn}
                path="/"
                redirectRoute="/login"
              />
            </Switch>
          </Layout>
        </Router>
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
