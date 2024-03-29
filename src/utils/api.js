import axios from "axios";

function createAPI() {
  const api = axios.create({
    baseURL: "https://news.rotarydistrict3292.org.np/wp-json/api",

    headers: {
      "content-type": "application/json",
      accept: "application/json",
      // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  return api;
}

export const apis = createAPI();
