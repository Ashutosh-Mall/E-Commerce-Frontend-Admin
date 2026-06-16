import { useEffect, useState } from "react";
import { useNavigate, useParams,  } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imgIn, setImgIn] = useState(0)

  const {
    product,
    getProductById,
    deleteProduct, 
    loading,
  } = useProduct();

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [id]);

  const handleEdit = () => {
    if (!product) return;

    navigate(`/product/edit/${product._id}`);
  };

  const handleDelete = async () => {
    if (!product) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(product._id);

      alert("Product deleted successfully");

      navigate("/dashboard  ");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-xl font-semibold">
        Loading...
      </h1>
    );
  }

  if (!product) {
    return (
      <h1 className="text-center mt-10 text-xl font-semibold">
        Product not found
      </h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.images[imgIn]}
            alt={product.title}
            className="w-full h-[500px] object-cover rounded-2xl border"
          />

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`product-${index}`}
                className="w-24 h-24 object-cover rounded-lg border cursor-pointer"
                onClick={()=>{setImgIn(index)}}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            {product.title}
          </h1>

          <p className="text-gray-500 mt-3">
            Category: {product.category}
          </p>

          <div className="mt-4">
            <span className="text-4xl font-bold text-purple-700">
              ₹{product.price}
            </span>
          </div>

          <div className="mt-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Stock: {product.stock}
            </span>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold text-lg mb-2">
              Description
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-6">
            <p className="font-semibold text-lg">
              ⭐ Rating: {product.averageRating}
            </p>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>
              Created:
              {" "}
              {new Date(product.createdAt).toLocaleDateString()}
            </p>

            <p>
              Updated:
              {" "}
              {new Date(product.updatedAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              Edit Product
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;