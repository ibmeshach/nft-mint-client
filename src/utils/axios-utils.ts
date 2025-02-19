import axios from "axios";

const api = process.env.NEXT_PUBLIC_BACKEND_API;
const apiKey = process.env.NEXT_PUBLIC_BACKEND_API_KEY;

export const client = axios.create({
  baseURL: `${api}`,
  headers: {
    "x-api-key": apiKey,
  },
});

export const request = ({ ...options }) => {
  client.defaults.withCredentials = true;
  return client(options);
};
