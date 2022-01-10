import { Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductInfo from "./pages/ProductInfo";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product" element={<ProductInfo />} />
      </Routes>
    </div>
  );
}

export default App;
