import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  headers: { Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`, "api-key": import.meta.env.VITE_API_KEY },
})
