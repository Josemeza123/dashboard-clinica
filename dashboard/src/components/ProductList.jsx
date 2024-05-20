import Link from "next/link";

function ProductList({product}) {
  return (
    <tr >
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.descripcion}</td>
      <td>{product.stock}</td>
      <td><Link href={`/products/${product.id}`}></Link></td>
    </tr>
  );
}

export default ProductList;
