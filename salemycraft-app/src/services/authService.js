import { API } from "../utils/api.js";
import { parseLoginId } from "../utils/authHelpers";

export const createUser = async (form) => {
  const res = await fetch(API.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: form.fullName,
      userName: form.username,
      email: form.email,
      phoneNumber: form.phone,
      password: form.password,
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Signup failed");

  return data;
};

export const loginUser = async (form) => {
  const parsed = parseLoginId(form.loginId);

  if (!parsed) throw new Error("Enter valid email or phone number");

  const body = {
    password: form.password,
    [parsed.type === "email" ? "email" : "phoneNumber"]: parsed.value,
  };

  const res = await fetch(API.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Login failed");

  localStorage.setItem("token", data.token);

  return data;
};
