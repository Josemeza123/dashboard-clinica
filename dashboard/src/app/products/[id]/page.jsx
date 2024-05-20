import axios from "axios";
import Buttons from "./Buttons";

async function loadProduct(productId) {
  const { data } = await axios.get(
    `http://localhost:3000/api/products/` + productId
  );
  return data;
}

async function ProductPage({ params }) {
  const product = await loadProduct(params.id);
  console.log(product);
  return (
    <section className="flex justify-center items-center">
      <div className="p-6">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-lg">{product.descripcion}</p>
        <p className="text-lg">{product.price}</p>
        <p className="text-lg">{product.stock}</p>
        <Buttons productId={product.id} />
      </div>
    </section>
  );
}

export default ProductPage;
