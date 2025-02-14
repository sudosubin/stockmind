import { render } from "preact";
import { LocationProvider, Route, Router } from "preact-iso";
import { Reshaped } from "reshaped";
import "#/shared/modern-normalize.css";
import "reshaped/themes/reshaped/theme.css";

export function App() {
  return (
    <LocationProvider>
      <Reshaped theme="reshaped" defaultColorMode="light">
        <Router>
          {/* <Route path="/" component={Home} />
          <Route default component={NotFound} /> */}
        </Router>
      </Reshaped>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("root"));
