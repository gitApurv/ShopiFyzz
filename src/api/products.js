const API_URl = import.meta.env.VITE_API_URL;

export async function getAllProducts() {
  const response = await fetch(`${API_URl}/products`, {
    credentials: "include",
  });
  return response.json();
}

export async function getProduct(productId) {
  const response = await fetch(`${API_URl}/product/${productId}`, {
    credentials: "include",
  });
  return response.json();
}
