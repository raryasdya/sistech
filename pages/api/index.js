import { API_BASE_URL } from "./constants";
import { fetchGet, fetchPost } from "./utils";

export async function getAllBlogPosts() {
  return fetchGet(`${API_BASE_URL}/blog/`);
}

export async function likeBlogPost(blogId) {
  return fetchPost(`${API_BASE_URL}/blog/like/`, {id: blogId});
}
