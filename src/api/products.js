const API_URl = import.meta.env.VITE_API_URL;

export async function getProductsCount() {
  const response = await fetch(`${API_URl}/productsCount`, {
    credentials: "include",
  });
  return response.json();
}

export async function getProducts(page) {
  const response = await fetch(`${API_URl}/products/${page}`, {
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
