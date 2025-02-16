import "#/shared/modern-normalize.css";
import "reshaped/themes/reshaped/theme.css";
import { render } from "preact";
import { LocationProvider, Route, Router } from "preact-iso";
import { Reshaped } from "reshaped";
import { routes } from "#/constants/routes";
import { NotFound } from "#/pages/404";
import { IndexPage } from "#/pages/index";

const App = () => {
  return (
    <LocationProvider>
      <Reshaped theme="reshaped" defaultColorMode="light">
        <Router>
          <Route path={routes.index} component={IndexPage} />
          <Route default component={NotFound} />
        </Router>
      </Reshaped>
    </LocationProvider>
  );
};

render(<App />, document.getElementById("root"));
