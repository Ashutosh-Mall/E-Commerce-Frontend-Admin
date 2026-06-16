import {useEffect, useState} from "react";
import AddProducts from "../component/AddProducts";
import {useProduct} from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const {allProducts, getAllProducts ,getProductById} = useProduct();
  const [openAddProd, setOpenAddProd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  const handeleViewProduct = async (id: string): Promise<void> => {
    try {
      await getProductById(id);

      navigate(`/product/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setOpenAddProd(!openAddProd)}
        className="border p-3 rounded-2xl text-white/90 bg-purple-900 cursor-pointer"
      >
        {openAddProd ? "Close" : "Add Product"}
      </button>

      {openAddProd && <AddProducts />}

      <div className="flex flex-wrap gap-4 mt-6">
        {allProducts?.map((item: any) => (
          <div
            key={item._id}
            className="border rounded-2xl shadow-md overflow-hidden bg-white w-full md:w-[32%]"
          >
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="font-semibold text-lg line-clamp-1">
                {item.title}
              </h2>

              <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                {item.description}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-purple-700">₹{item.price}</span>

                <span className="text-sm text-gray-500">
                  Stock: {item.stock}
                </span>
              </div>

              <button
                onClick={() => handeleViewProduct(item._id)}
                className="w-full mt-4 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
