import { Button, Form, Modal } from "react-bootstrap";
import Head from "next/head";
import { useEffect, useState } from "react";

import { createBlogPost, getAllBlogPosts, likeBlogPost, updateBlogPost } from "../api";
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
            <Form.Control as="textarea" placeholder="Enter Content" required />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button type="submit">Post</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function FormUpdateModal(props) {

  function onUpdatePost(event) {
    event.preventDefault();
    const title = event.currentTarget.elements.titleInput.value;
    const content = event.currentTarget.elements.contentInput.value;
    const id = event.currentTarget.elements.idInput.value;
    updateBlogPost(title, content, id).then(() => props.onFinish());
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
          Edit Blog Post
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onUpdatePost}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="titleInput">
            <Form.Label>Title</Form.Label>
            <Form.Control type="type" placeholder="Enter title" defaultValue={props.data.title} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contentInput">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" placeholder="Enter Content" defaultValue={props.data.content} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="idInput">
            <Form.Control type="hidden" value={props.data.id} />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button type="submit">Edit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default function Index() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [modalCreateShow, setModalCreateShow] = useState(false);
  const [modalUpdateShow, setModalUpdateShow] = useState(false);
  const [selectedData, setselectedData] = useState({ title: "", content: "", id: "" });

  useEffect(() => {
    getAllBlogPosts().then((res) => setBlogPosts(res));
    setRefresh(false)
  }, [refresh])

  const handlePostLike = (id) => {
    likeBlogPost(id);
    setRefresh(true)
  }

  const handlePostEditButton = (data) => {
    setselectedData(data);
    setModalUpdateShow(true);
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
          {blogPosts.map(post => {
            return (
              <div key={post.id} className={styles.card}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>{post.like}</p>
                <Button onClick={() => handlePostLike(post.id)}> Like! </Button>
                <Button onClick={() => handlePostEditButton(post)}> Edit </Button>
              </div>
            )
          })}
        </div>
      </main>

      <FormCreateModal
        show={modalCreateShow}
        onFinish={() => { setRefresh(true); setModalCreateShow(false) }}
        onHide={() => { setModalCreateShow(false) }}
      />

      <FormUpdateModal
        show={modalUpdateShow}
        onFinish={() => { setRefresh(true); setModalUpdateShow(false) }}
        onHide={() => { setModalUpdateShow(false) }}
        data={selectedData}
      />

    </div>
  )
}
