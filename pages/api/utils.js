import { API_TOKEN } from "./constants";

export async function fetchGet(url) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${API_TOKEN}`,
    },
    mode: "cors",
  });
  return response.json();
}

export async function fetchPost(url, payload) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${API_TOKEN}`,
    },
    mode: "cors",
  });
}

export async function fetchPut(url, payload) {
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${API_TOKEN}`,
    },
    mode: "cors",
  });
}
