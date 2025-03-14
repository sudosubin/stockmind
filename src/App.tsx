import { StockPage } from "#/pages/steps/stocks/:stock";
import { Reshaped } from "reshaped";
import { Route, Switch } from "wouter";
import { NotFound } from "#/pages/404";
import { IndexPage } from "#/pages/index";
import { StepsLoadingPage } from "#/pages/steps/loading";
import { StepsResultPage } from "#/pages/steps/result";
import { StepsStartPage } from "#/pages/steps/start";
import { routes } from "#/shared/route";

export const App = () => {
  return (
    <Reshaped theme="reshaped">
      <Switch>
        <Route path={routes.index} component={IndexPage} />
        <Route path={routes.steps.start} component={StepsStartPage} />
        <Route path={routes.steps.stock} component={StockPage} />
        <Route path={routes.steps.loading} component={StepsLoadingPage} />
        <Route path={routes.steps.result} component={StepsResultPage} />
        <Route component={NotFound} />
      </Switch>
    </Reshaped>
  );
};
