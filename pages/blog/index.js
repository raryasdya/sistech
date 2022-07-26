import { Button, Form, Modal } from "react-bootstrap";
import Head from "next/head";
import { useEffect, useState } from "react";

import { createBlogPost, getAllBlogPosts, likeBlogPost } from "../api";
import styles from '../../styles/Home.module.css'

function FormCreateModal(props) {

  function onCreatePost(event) {
    event.preventDefault();
    const title = event.currentTarget.elements.titleInput.value;
    const content = event.currentTarget.elements.contentInput.value;
    createBlogPost(title, content).then(() => props.onFinish());
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New Blog Post
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onCreatePost}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="titleInput">
            <Form.Label>Title</Form.Label>
            <Form.Control type="type" placeholder="Enter title" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contentInput">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" placeholder="Enter Content" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button type="submit">Post</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default function Index() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modalCreateShow, setModalCreateShow] = useState(false);

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

        <Button onClick={() => setModalCreateShow(true)}> Create New Post</Button>

        <div className={styles.grid}>
          {blogPosts.map(post => (
            <div key={post.id} className={styles.card}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>{post.like}</p>
              <Button onClick={() => handlePostLike(post.id)}> Like! </Button>
            </div>
          ))}
        </div>
      </main>

      <FormCreateModal
        show={modalCreateShow}
        onFinish={() => { setRefresh(true); setModalCreateShow(false) }}
      />
    </div>
  )
}
