import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "reshaped/themes/reshaped/theme.css";
import "#/shared/modern-normalize.css";
import "#/shared/override-font.css";
import { StockPage } from "#/pages/steps/stocks/:stock";
import { render } from "preact";
import { LocationProvider, Route, Router } from "preact-iso";
import { Reshaped } from "reshaped";
import { NotFound } from "#/pages/404";
import { IndexPage } from "#/pages/index";
import { StepsLoadingPage } from "#/pages/steps/loading";
import { StepsResultPage } from "#/pages/steps/result";
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
          <Route path={routes.steps.loading} component={StepsLoadingPage} />
          <Route path={routes.steps.result} component={StepsResultPage} />
          <Route default component={NotFound} />
        </Router>
      </Reshaped>
    </LocationProvider>
  );
};

render(<App />, document.getElementById("root"));
