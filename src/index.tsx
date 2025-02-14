import { render } from "preact";
import { LocationProvider, Route, Router } from "preact-iso";

import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home/index.jsx";
import { NotFound } from "./pages/_404.jsx";

import "reshaped/themes/reshaped/theme.css";
import { Reshaped } from "reshaped";

export function App() {
  return (
    <LocationProvider>
      <Reshaped theme="reshaped" defaultColorMode="light">
        <Header />
        <Router>
          <Route path="/" component={Home} />
          <Route default component={NotFound} />
        </Router>
      </Reshaped>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("root"));
