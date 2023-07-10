import React, { useEffect, useState } from "react";

import { Layout } from "antd";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Main from "components/Main";
import NavBar from "components/Navbar/Navbar";

const App = () => {
  const [loading, setLoading] = useState(true);
  const queryClient = new QueryClient();

  useEffect(() => {
    initializeLogger();
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
