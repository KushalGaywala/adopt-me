import { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  // Using ThemeContext to use globally but not recommended
  // which is already created
  const theme = useState("");
  // Used hooks in app for searchparams to maintain the state of the values
  const locationHook = useState("");
  const animalHook = useState("");
  const breedHook = useState("");

  return (
    // Assigning the Context variable the value for further Usage
    <ThemeContext.Provider value={theme}>
      <div>
        {/* Router used to give Links and Routes tags */}
        <Router>
          <header>
            {/* Link to redirect page. It is used instead of <a> anchor tag */}
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          {/*
           * Switch used to stop the Router after first Route encounter
           * If switch is not used both the routes will be matched as "/" matches the
           * link "/details/:id" passed from the pets component
           */}
          <Switch>
            {/* Route used to match the links then we can do operations
             * we want to undertake inside the tag
             */}
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              {/* Used hooks in app for searchparams to maintain the state of the values */}
              <SearchParams
                locationHook={locationHook}
                animalHook={animalHook}
                breedHook={breedHook}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
