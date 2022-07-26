import Head from "next/head";
import { useEffect, useState } from "react";

import { getAllBlogPosts, likeBlogPost } from "../api";
import styles from '../../styles/Home.module.css'


export default function Index() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  console.log(blogPosts);

  useEffect(() => {
    getAllBlogPosts().then((res) => setBlogPosts(res));
    setRefresh(false)
  }, [refresh])

  const handlePostLike = (id) => {
    likeBlogPost(id);
    setRefresh(true)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog Posts</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Blog
        </h1>

        <div className={styles.grid}>
          {blogPosts.map(post => (
            <div key={post.id} className={styles.card}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>{post.like}</p>
              <button onClick={() => handlePostLike(post.id)}> Like! </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
