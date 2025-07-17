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
  const response = await fetch(`${API_URl}/download-receipt/${orderId}`, {
    credentials: "include",
  });
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `order-${orderId}.pdf`;
  document.body.appendChild(a); // required for Firefox
  a.click();
  a.remove();
}
