const API_URl = import.meta.env.VITE_API_URL;

export async function loginUser(data) {
  const response = await fetch(`${API_URl}/login`, {
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
  const response = await fetch(`${API_URl}/signup`, {
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
  const response = await fetch(`${API_URl}/logout`, {
    credentials: "include",
  });
  return response.json();
}
