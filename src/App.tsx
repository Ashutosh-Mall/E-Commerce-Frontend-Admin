import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductDetail from "./pages/ProductDetail";
import EditProduct from "./pages/EditProduct";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
};

export default App;
