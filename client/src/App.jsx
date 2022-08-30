import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Community from "./pages/Community/Community";
import Home from "./pages/Home/Home";
import MyPets from "./pages/MyPets/MyPets";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddPet from "./pages/AddPet/AddPet";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Pet from "./pages/Pet/Pet";
import PetMealTime from "./components/PetMealTime/PetMealTime";
import DetailsandGallery from "./pages/DetailsandGallery/DetailsandGallery";
import ForgetPass from "./pages/ForgetPass/ForgetPass";
import VaccinationAndMedical from "./pages/VaccinationAndMedical/VaccinationAndMedical";
import { Alert, Collapse, IconButton } from "@mui/material";
import { useState } from "react";
import Otp from "./pages/Otp/Otp";

function App() {
  const [alert, setAlert] = useState("true");
  const [severity, setSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);
  const User = { name: "Kabeer", _id: "Some ID" };
  return (
    <>
      <BrowserRouter>
        <Navigation user={User} />
        <Collapse in={openAlert}>
          <Alert
            severity={severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <i className="fa fa-times"></i>
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alert}
          </Alert>
        </Collapse>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/my_pets" element={<MyPets />}></Route>
            <Route path="/my_pets/add_pet" element={<AddPet />} />
            <Route path="/my_pets/pet" element={<Pet />}>
              <Route index element={<DetailsandGallery />}></Route>
              <Route
                path="details_and_gallery"
                element={<DetailsandGallery />}
              ></Route>
              <Route
                path="vaccination_and_medical_details"
                element={<VaccinationAndMedical />}
              ></Route>
              <Route path="meal_timings" element={<PetMealTime />}></Route>
              <Route path="walk_timings" element={<Shop />}></Route>
            </Route>
            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/community" element={<Community />}></Route>
            <Route
              path="/login"
              element={
                <Login
                  setAlert={setAlert}
                  setOpenAlert={setOpenAlert}
                  setSeverity={setSeverity}
                />
              }
            ></Route>
            <Route path="/forget_password" element={<ForgetPass />}></Route>
            <Route path="/verify_otp" element={<Otp />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </div>
        {/* <Footer></Footer> */}
      </BrowserRouter>
    </>
  );
}

export default App;
