import { API_BASE_URL } from "./constants";
import { fetchGet, fetchPost } from "./utils";

export async function getAllBlogPosts() {
  return fetchGet(`${API_BASE_URL}/blog/`);
}

export async function createBlogPost(title, content) {
  return fetchPost(`${API_BASE_URL}/blog/`, { title: title, content: content });
}

export async function likeBlogPost(id) {
  return fetchPost(`${API_BASE_URL}/blog/like/`, { id: id });
}
