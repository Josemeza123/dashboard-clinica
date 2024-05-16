"use client";
import React, { useRef, useState } from "react";
import axios from "axios";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    descripcion: "",
  });
  const form = useRef(null);
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);
    const res = await axios.post("/api/products", product);
    console.log(res);
    form.current.reset();
  };
  return (
    <div>
      <form
        action=""
        className="bg-white shadow-md rounded-md px-8 py-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nombre del producto"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />

        <label
          htmlFor="price"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="00.00"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />

        <label
          htmlFor="descripcion"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          descripcion
        </label>
        <textarea
          rows={3}
          id="descripcion"
          name="descripcion"
          placeholder="descripcion"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        ></textarea>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
