"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    descripcion: "",
  });

  const router = useRouter();
  const form = useRef(null);
  const params = useParams();

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (params.id) {
      axios.get(`/api/products/${params.id}`).then((res) => {
        setProduct({
          name: res.data.name,
          price: res.data.price,
          descripcion: res.data.descripcion,
        });
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(product);
    if (!params.id) {
      const res = await axios.post("/api/products", product);
      // console.log(res);
    } else {
      const res = await axios.put("/api/products/" + params.id, product);
      // console.log(res);
    }
    form.current.reset();
    router.refresh();
    router.push("/products");
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
          autoFocus
          placeholder="Nombre del producto"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={product.name}
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
          value={product.price}
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
          value={product.descripcion}
        ></textarea>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {params.id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
