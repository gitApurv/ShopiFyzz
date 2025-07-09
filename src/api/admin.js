const API_URl = import.meta.env.VITE_API_URL;

export async function getProducts() {
  const response = await fetch(`${API_URl}/admin/products`, {
    credentials: "include",
  });
  return response.json();
}

export async function getProduct(productId) {
  const response = await fetch(`${API_URl}/admin/product/${productId}`, {
    credentials: "include",
  });
  return response.json();
}

export async function addProduct(product) {
  const response = await fetch(`${API_URl}/admin/add-product`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return response.json();
}

export async function editProduct(productId, product) {
  const response = await fetch(`${API_URl}/admin/edit-product/${productId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return response.json();
}

export async function deleteProduct(productId) {
  const response = await fetch(`${API_URl}/admin/delete/${productId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
