import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="navbar">
          <Navigation></Navigation>
        </div>
        <div className="App">
          This is Acctual App
          <Routes></Routes>
        </div>
        <div className="footer">
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
