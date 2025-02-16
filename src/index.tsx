import "#/shared/modern-normalize.css";
import "reshaped/themes/reshaped/theme.css";
import { StockPage } from "#/pages/steps/stocks/:stock";
import { render } from "preact";
import { LocationProvider, Route, Router } from "preact-iso";
import { Reshaped } from "reshaped";
import { NotFound } from "#/pages/404";
import { IndexPage } from "#/pages/index";
import { StepsStartPage } from "#/pages/steps/start";
import { routes } from "#/shared/route";

const App = () => {
  return (
    <LocationProvider>
      <Reshaped theme="reshaped" defaultColorMode="light">
        <Router>
          <Route path={routes.index} component={IndexPage} />
          <Route path={routes.steps.start} component={StepsStartPage} />
          <Route path={routes.steps.stock} component={StockPage} />
          <Route default component={NotFound} />
        </Router>
      </Reshaped>
    </LocationProvider>
  );
};

render(<App />, document.getElementById("root"));
