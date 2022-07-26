import { Button, Card, Form, Modal } from "react-bootstrap";
import Head from "next/head";
import { useEffect, useState } from "react";

import { createBlogPost, getAllBlogPosts, likeBlogPost, updateBlogPost } from "../api";
import styles from '../../styles/Blog.module.css'
import { Icon } from "@iconify/react";

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
          Add New Blog Post
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onCreatePost}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="titleInput">
            <Form.Label>Title</Form.Label>
            <Form.Control type="type" placeholder="Enter Title" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contentInput">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" placeholder="Enter Content" required />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button type="submit" style={{ backgroundColor: "#83a484" }}>Post</Button>
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
          <Button type="submit" style={{ backgroundColor: "#83a484" }}>Edit</Button>
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
    <div className='my-5'>
      <Head>
        <title>Blog</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Blog
        </h1>
        <div className="mb-4 d-flex align-items-center justify-content-end">
          <Button className="d-flex align-items-center" onClick={() => setModalCreateShow(true)} style={{ backgroundColor: "#83a484" }}>
            <div className='my-0 mx-1'>
              <Icon icon="akar-icons:plus" width='20px' />
            </div>
            <div className='my-0 mx-1 d-flex'>
              Add Post
            </div>
          </Button>
        </div>

        <div className={styles.grid}>
          {blogPosts.map(post => {
            return (
              <Card key={post.id} className={`m-3 col-sm-3 col-md-3 ${styles.classCard}`}>
                <Card.Header>
                  <Card.Title className='text-center'>
                    {post.title}
                    <Icon className={styles.blogIcon} onClick={() => handlePostEditButton(post)} icon="bxs:pencil" />
                  </Card.Title>
                </Card.Header>
                <Card.Body className={styles.cardBody}>
                  <Card.Text>{post.content}</Card.Text>
                </Card.Body>
                <Card.Footer className={styles.blogFooter}>
                  <Card.Subtitle>
                    {post.like} Like(s)
                  </Card.Subtitle>
                  <Icon className={styles.blogIcon} onClick={() => handlePostLike(post.id)} icon="heroicons-solid:thumb-up" color="#83a484" />
                </Card.Footer>
              </Card>
            )
          })}
        </div>
      </main >

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
    </div >
  )
}
