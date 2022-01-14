import { Route, Routes } from "react-router-dom";
import "./App.css";
import Spinner from "./components/Spinner";
import CartPage from "./pages/CartPage";
import FirebaseTest from "./pages/FirebaseTest";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductInfo from "./pages/ProductInfo";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <CartPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/productInfo/:prodId"
          element={
            <ProtectedRoutes>
              <ProductInfo />
            </ProtectedRoutes>
          }
        />
        <Route path="/firebase" element={<FirebaseTest />} />
      </Routes>
    </div>
  );
}

export function ProtectedRoutes({ children }) {
  if (JSON.parse(localStorage.getItem("verifiedUser"))) {
    return children;
  } else {
    return <LoginPage />;
  }
}
