import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import SpinnerScreen from "./shared/SpinnerScreen";
import routes from "../routes-conversational";
import convoHeaderRoutes from "../conversational-header-routes";

function AppConversational(props) {
  return (
    <main className="d-flex flex-wrap">
      <Container fluid className="p-0 outerWrapper">
        {convoHeaderRoutes.map((route, i) => {
          return <Route path={route.path} key={i + 1} render={route.render} />;
        })}

        <React.Suspense fallback={<SpinnerScreen title="Loading Sirius App" />}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={(props) => <route.main {...props} />}
              />
            ))}
          </Switch>
        </React.Suspense>
      </Container>
    </main>
  );
}

export default AppConversational;
