import "./App.css";
import React from "react";
import Navigation from "./Components/Navigation/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddItems from "./Components/AddItems/AddItems";
import Addpet from "./Components/AddPet/Addpet";
import Logo from "./assets/logo.png";

import { Box } from "@mui/material";
import Users from "./Pages/Users";

const App = () => {
  return (
    <Router>
      <Box sx={{ height: "72px", borderBottom: "1px solid #c2c2c2" }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
            p: "0 30px",
            backgroundColor: "white",
          }}
        >
          <img src={Logo} alt="Pet Hub" style={{ width: "150px" }} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "250px" }}>
          <Navigation />
        </Box>
        <Box sx={{ width: "calc(100% - 250px)" }}>
          <Switch>
            <Route path="/Users">
              <Users />
            </Route>
            <Route path="/AddPets">
              <Addpet />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
