import React, {useState} from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import {useProduct} from "../context/ProductContext";

export interface ProductType {
  title: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  images: File[];
}

const AddProducts = () => {
  const {addProduct} = useProduct();
  const [product, setProduct] = useState<ProductType>({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (files.length > 4) {
      alert("Maximum 4 images allowed");
      return;
    }
    setProduct((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addProduct(product);
  };

  return (
    <div className="flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 p-6 rounded-xl shadow"
      >
        <h1 className="text-2xl font-bold">Add Product</h1>

        <Input
          size="md"
          theme="light"
          placeholder="Title"
          name="title"
          value={product.title}
          onChange={handleChange}
        />

        <Input
          size="md"
          theme="light"
          placeholder="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
        />

        <Input
          size="md"
          theme="light"
          placeholder="Price"
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />

        <Input
          size="md"
          theme="light"
          placeholder="Stock"
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
        />

        <Input
          size="md"
          theme="light"
          placeholder="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
        />

        <label className="border p-2 rounded border-purple-600 cursor-pointer inline-block">
          Choose up to 4 product images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Preview ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg border h-full"
            />
          ))}
        </div>

        <p className="text-sm text-gray-500">
          {product.images.length} image(s) selected
        </p>

        <Button text="Add Product" size="md" theme="dark" type="submit" />
      </form>
    </div>
  );
};

export default AddProducts;
