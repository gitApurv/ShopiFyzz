const API_URl = import.meta.env.VITE_API_URL;

export async function getOrders() {
  const response = await fetch(`${API_URl}/orders`, {
    credentials: "include",
  });
  return response.json();
}

export async function getOrder(orderId) {
  const response = await fetch(`${API_URl}/order/${orderId}`, {
    credentials: "include",
  });
  return response.json();
}

export async function createOrder() {
  const response = await fetch(`${API_URl}/create-order`, {
    credentials: "include",
  });
  return response.json();
}

export async function downloadReceipt(orderId) {
  const response = await fetch(`${API_URl}/downlaod-receipt/${orderId}`, {
    credentials: "include",
  });
  return response.json();
}
