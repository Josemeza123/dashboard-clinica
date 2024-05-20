import ProductList from "@/src/components/ProductList";
import axios from "axios";

async function loadProducts() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  return data;
}

async function ProductsPage() {
  const products = await loadProducts();
  console.log(products);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripcion</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductList product={product} key={product.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;
