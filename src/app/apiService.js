import axios from "axios";

fetch("http://localhost:8080/users") // Replace with your actual backend URL
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
// Assuming your Express server is running on this port

const api = axios.create({
  baseURL: "http://localhost:8080", // Replace with your actual backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsers = () => apiService.get("/users");

export const createUser = (userData) => apiService.post("/post", userData);

export const updateUser = (studentId, userData) =>
  apiService.patch("/update", { studentId, ...userData });

export const deleteUser = (studentId) =>
  apiService.delete("/delete", { data: { studentId } });
