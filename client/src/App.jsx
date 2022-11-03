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
import DetailsandGallery from "./pages/Pet/DetailsandGallery/DetailsandGallery";
import ForgetPass from "./pages/ForgetPass/ForgetPass";
import VaccinationAndMedical from "./pages/Pet/VaccinationAndMedical/VaccinationAndMedical";
import { Alert, Collapse, IconButton } from "@mui/material";
import { useState } from "react";
import Otp from "./pages/Otp/Otp";
import MealTime from "./pages/Pet/MealTime/MealTime";
import WalkTime from "./pages/Pet/WalkTime/WalkTime";
import Adopt from "./pages/Adopt/Adopt";
import ShopDetails from "./pages/Shop/ShopDetails/ShopDetails";

function App() {
  const [alert, setAlert] = useState("true");
  const [severity, setSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);
  const [Product, setProduct] = useState({});
  const [login, setLogin] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <>
      <BrowserRouter>
        <Navigation login={login} />
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
            {console.log(login)}
            {login ? (
              <Route path="/my_pets" element={<MyPets />}></Route>
            ) : (
              <Route
                path="/my_pets"
                element={
                  <Login
                    setAlert={setAlert}
                    setOpenAlert={setOpenAlert}
                    setSeverity={setSeverity}
                    setLogin={setLogin}
                  />
                }
              ></Route>
            )}
            <Route path="/my_pets/add_pet" element={<AddPet />} />
            {/* <Route path="/" element={<AddPet />} /> */}
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
              <Route path="meal_timings" element={<MealTime />}></Route>
              <Route path="walk_timings" element={<WalkTime />}></Route>
            </Route>
            <Route
              path="/shop"
              element={<Shop setProduct={setProduct} />}
            ></Route>
            <Route
              path={`/product/${Product._id}`}
              element={<ShopDetails Product={Product} />}
            ></Route>
            <Route path="/adopt" element={<Adopt />}></Route>
            <Route path="/community" element={<Community />}></Route>
            <Route
              path="/login"
              element={
                <Login
                  setAlert={setAlert}
                  setOpenAlert={setOpenAlert}
                  setSeverity={setSeverity}
                  setLogin={setLogin}
                />
              }
            ></Route>
            <Route path="/forget_password" element={<ForgetPass />}></Route>
            <Route
              path="/verify_otp"
              element={
                <Otp
                  userId={userId}
                  setAlert={setAlert}
                  setOpenAlert={setOpenAlert}
                  setSeverity={setSeverity}
                />
              }
            ></Route>
            <Route
              path="/register"
              element={
                <Register
                  setAlert={setAlert}
                  setOpenAlert={setOpenAlert}
                  setSeverity={setSeverity}
                  setUserId={setUserId}
                />
              }
            ></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </div>
        {/* <Footer></Footer> */}
      </BrowserRouter>
    </>
  );
}

export default App;
