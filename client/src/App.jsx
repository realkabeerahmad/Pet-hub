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
import { Alert, Collapse, IconButton, LinearProgress } from "@mui/material";
import { useState } from "react";
import Otp from "./pages/Otp/Otp";
import MealTime from "./pages/Pet/MealTime/MealTime";
import WalkTime from "./pages/Pet/WalkTime/WalkTime";
import Adopt from "./pages/Adopt/Adopt";
import ShopDetails from "./pages/Shop/ShopDetails/ShopDetails";
import AdoptDetails from "./pages/Adopt/AdoptDetails/AdoptDetails";
import AdoptApplication from "./pages/Adopt/AdoptApplication/AdoptApplication";
import User from "./pages/User/User";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
// ------------------------------------------------------------------------------------

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

// ----------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

function App() {
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: "{{CLIENT_SECRET}}",
  // };
  // ----------------------------------------------------------------
  const [alert, setAlert] = useState("true");
  const [severity, setSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);
  const [Product, setProduct] = useState({});
  const [pet, setPet] = useState({});
  // const [Pets, setPets] = useState({});
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [cart, setCart] = useState({});
  if (openAlert === true) {
    setTimeout(() => {
      setOpenAlert(false);
    }, 5000);
  }
  const LoginComponent = (
    <Login
      setAlert={setAlert}
      setOpenAlert={setOpenAlert}
      setSeverity={setSeverity}
      setLogin={setLogin}
      setUser={setUser}
      user={user}
      setCart={setCart}
    />
  );
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  return (
    <>
      <BrowserRouter>
        {/* Navigation Bar */}
        {/* ----------------------------------------- */}
        {/* ----------------------------------------- */}
        {/* ----------------------------------------- */}
        {/* ----------------------------------------- */}
        <Navigation
          login={login}
          setLogin={setLogin}
          user={user}
          setAlert={setAlert}
          setOpenAlert={setOpenAlert}
          setSeverity={setSeverity}
        />
        {/* <LinearProgress color="success" /> */}
        {/* Alert Area */}
        {/* ----------------------------------------- */}
        {/* ----------------------------------------- */}
        {/* ----------------------------------------- */}
        {/* ----------------------------------------- */}
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
        {/* App Structure */}
        {/* ----------------------------------------- */}
        {/* ----------------------------------------- */}
        {/* ----------------------------------------- */}
        {/* ----------------------------------------- */}
        <div className="App">
          <Routes>
            {/* Home */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            <Route exact path="/" element={<Home />}></Route>
            {/* User */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            <Route
              path="/user"
              element={
                login ? <User user={user} setUser={setUser} /> : LoginComponent
              }
            ></Route>
            {/* My Pets */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            <Route
              path="/my_pets"
              element={
                login ? <MyPets user={user} setPet={setPet} /> : LoginComponent
              }
            ></Route>
            {/* Add Pet Form */}
            <Route
              path="/my_pets/add_pet"
              element={login ? <AddPet user={user} /> : LoginComponent}
            />
            {/* Pet Screen */}
            <Route path={"/my_pets/" + pet._id} element={<Pet Pet={pet} />}>
              <Route index element={<DetailsandGallery />}></Route>
              <Route
                path="details_and_gallery"
                element={<DetailsandGallery Pet={pet} setPet={setPet} />}
              ></Route>
              <Route
                path="vaccination_and_medical_details"
                element={<VaccinationAndMedical Pet={pet} setPet={setPet} />}
              ></Route>
              <Route
                path="meal_timings"
                element={<MealTime Pet={pet} setPet={setPet} />}
              ></Route>
              <Route
                path="walk_timings"
                element={<WalkTime Pet={pet} setPet={setPet} />}
              ></Route>
            </Route>

            {/* Shop Routes */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            <Route
              path="/shop"
              element={<Shop setProduct={setProduct} />}
            ></Route>
            <Route
              path="/shop/cart"
              element={
                login ? <Cart cart={cart} setCart={setCart} /> : LoginComponent
              }
            ></Route>

            <Route
              path="/shop/checkOut"
              element={
                cart.products ? (
                  // <Elements stripe={stripePromise}>
                  <CheckOut cart={cart} setCart={setCart} user={user} />
                ) : (
                  // </Elements>
                  <Cart cart={cart} setCart={setCart} />
                )
              }
            ></Route>
            <Route
              path={`/product/${Product._id}`}
              element={
                <ShopDetails
                  Product={Product}
                  cart={cart}
                  setCart={setCart}
                  user={user}
                />
              }
            ></Route>

            {/* Adopt */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            <Route path="/adopt" element={<Adopt setPet={setPet} />}></Route>
            <Route
              path={"/adopt/" + pet._id}
              element={<AdoptDetails Pet={pet} />}
            ></Route>
            {/* Auth */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            {/* ----------------------------------------- */}
            <Route
              path={"/adopt/" + pet._id + "/application"}
              element={
                login ? (
                  <AdoptApplication Pet={pet} user={user} />
                ) : (
                  LoginComponent
                )
              }
            ></Route>
            <Route path="/community" element={<Community />}></Route>
            <Route path="/login" element={LoginComponent}></Route>
            <Route path="/forget_password" element={<ForgetPass />}></Route>
            <Route
              path="/verify_otp"
              element={
                <Otp
                  user={user}
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
