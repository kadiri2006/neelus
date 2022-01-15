import { Route, Routes } from "react-router-dom";
import "./App.css";
import Spinner from "./components/Spinner";
import Admin from "./pages/Admin";
import CartPage from "./pages/CartPage";
import Empty from "./pages/Empty";
import FirebaseTest from "./pages/FirebaseTest";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
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
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <CartPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <OrdersPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/firebase"
          element={
            <AdminRoute>
              <FirebaseTest />
            </AdminRoute>
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<Empty />} />
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
export function AdminRoute({ children }) {
  if (
    JSON.parse(localStorage.getItem("verifiedUser")).uid ===
    "nIViJDa2lQQIVF2KNEkkW0yUI4I2"
  ) {
    return children;
  } else {
    return <Empty />;
  }
}
