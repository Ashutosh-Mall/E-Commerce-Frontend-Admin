import {createContext, useContext, useState} from "react";
import axios from "axios";
import type {ProductType} from "../component/AddProducts";

const API = import.meta.env.VITE_BACKEND_URL;

export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  averageRating: number;
  createdAt: string;
  updatedAt: string;
};

type ProductContextType = {
  product: Product | null;
  allProducts: Product[];
  loading: boolean;
  addProduct: (productData: ProductType) => Promise<void>;
  getAllProducts: () => Promise<void>;
  getProductById: (id: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

type ProductProviderProps = {
  children: React.ReactNode;
};

export const ProductProvider = ({children}: ProductProviderProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const addProduct = async (productData: ProductType) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", productData.title);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("stock", productData.stock);
      formData.append("category", productData.category);

      productData.images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios.post(`${API}/admin/products/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setProduct(response.data.product);
    } catch (error) {
      console.error("Add Product Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}/admin/products/get`, {
        withCredentials: true,
      });
      setAllProducts(response.data.data);
    } catch (error) {
      console.error("Get Products Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: string) => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}/admin/products/get/${id}`, {
        withCredentials: true,
      });

      setProduct(response.data.data);
    } catch (error) {
      console.error("Get Product Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`${API}/admin/products/delete/${id}`, {
        withCredentials: true,
      });

      setAllProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        allProducts,
        loading,
        addProduct,
        getAllProducts,
        getProductById,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be used within ProductProvider");
  }

  return context;
};
