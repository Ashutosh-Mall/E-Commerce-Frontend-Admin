import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useProduct} from "../context/ProductContext";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

const EditProduct = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const {product, getProductById, loading} = useProduct();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (files.length > 4) {
      alert("Maximum 4 images allowed");
      return;
    }

    setImages(files);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();

      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      formDataObj.append("price", formData.price);
      formDataObj.append("stock", formData.stock);
      formDataObj.append("category", formData.category);

      images.forEach((image) => {
        formDataObj.append("images", image);
      });

      const response = await axios.put(`${API}/admin/products/update/${id}`, formDataObj, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data)

      alert("Product updated successfully");

      navigate(`/product/${id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-xl font-semibold">Loading...</h1>
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={5}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border p-3 rounded-lg"
          />

          {product.images?.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Current Images</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.images
                  ?.filter((img) => img && img.trim() !== "")
                  .map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`current-${index}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Upload New Images */}
          <div>
            <label className="border-2 border-dashed border-purple-600 p-4 rounded-lg cursor-pointer block text-center">
              Choose New Images (Optional)
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Preview New Images */}
          {images.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">New Images Preview</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                ))}
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {images.length} image(s) selected
              </p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
