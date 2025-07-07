import { useParams } from "react-router";

export default function ProductDetails() {
  const { productId } = useParams();
  return <h1>Product Details Page</h1>;
}
