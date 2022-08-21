import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
import Community from "./pages/Community/Community";
import Home from "./pages/Home/Home";
import MyPets from "./pages/MyPets/MyPets";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation></Navigation>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/my_pets" element={<MyPets />}></Route>
            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/community" element={<Community />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
