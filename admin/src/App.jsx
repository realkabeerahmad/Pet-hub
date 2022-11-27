import "./App.css";
import React from "react";
import Navigation from "./Components/Navigation/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddItems from "./Components/AddItems/AddItems";
import Addpet from "./Components/AddPet/Addpet";

const App = () => {
  return (
    <div className="App">
      <Router>
        <div className="top-bar">
          <Navigation />
        </div>
        <div className="App-Screen">
          <Switch>
            <Route path="/AddProducts">
              <AddItems />
            </Route>
            <Route path="/AddPets">
              <Addpet />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
