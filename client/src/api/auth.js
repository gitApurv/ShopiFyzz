const API_URL = import.meta.env.VITE_API_URL;

export async function loginUser(data) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function signUpUser(data) {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function forgotPassword(data) {
  const response = await fetch(`${API_URL}/forgot`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function resetPassword(token, data) {
  const response = await fetch(`${API_URL}/reset/${token}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function logOutUser() {
  const response = await fetch(`${API_URL}/logout`, {
    credentials: "include",
  });
  return response.json();
}
