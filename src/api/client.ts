import axios from "axios";
import { BASE_URL } from "./base";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
});

axiosClient.interceptors.request.use((request) => {
  console.log("Outgoing Network Call >> ", JSON.stringify(request));

  return request;
});
