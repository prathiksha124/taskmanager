import axios from "axios";

export default axios.create({
  baseURL: "http://backend:8080/api",
});