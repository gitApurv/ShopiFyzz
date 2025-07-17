const API_URl = import.meta.env.VITE_API_URL;

export async function getCart() {
  const response = await fetch(`${API_URl}/cart`, {
    credentials: "include",
  });
  return response.json();
}

export async function addProductToCart(productId) {
  const response = await fetch(`${API_URl}/add-to-cart/${productId}`, {
    credentials: "include",
  });
  return response.json();
}

export async function removeProductFromCart(productId) {
  const response = await fetch(`${API_URl}/remove-from-cart/${productId}`, {
    credentials: "include",
  });
  return response.json();
}

export async function deleteProductFromCart(productId) {
  const response = await fetch(`${API_URl}/delete-from-cart/${productId}`, {
    credentials: "include",
  });
  return response.json();
}
