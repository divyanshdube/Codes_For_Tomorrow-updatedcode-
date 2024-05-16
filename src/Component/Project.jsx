import React, { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { TfiMenuAlt } from "react-icons/tfi";
import FormData from "./Form";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardSubtitle,
  CardText,
} from "reactstrap";

import axios from "axios";
import "./styles.css";
const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewToggleCard, setViewToggleCard] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      console.log(response);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const viewToggleCardOnclick = () => {
    setViewToggleCard(!viewToggleCard);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="full-height-container">
      <Container fluid className="full-height-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Row className="full-height-row">
              <Col
                sm="3"
                className="full-height-col"
                style={{ backgroundColor: "#E5ECF2" }}
              >
                <div>
                  <Card className="mt-5 ms-5">
                    <CardBody>
                      <CardTitle tag="h5">Hi Reader,</CardTitle>
                      <CardSubtitle
                        style={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        <span className="ms-">Here's your News!</span>
                      </CardSubtitle>
                    </CardBody>
                  </Card>
                  <Card className="mt-5 ms-5">
                    <CardBody>
                      <CardTitle
                        tag="h5"
                        className="d-flex justify-content-center"
                        style={{ fontWeight: "bold" }}
                      >
                        View Toggle
                      </CardTitle>
                      <div className="d-flex justify-content-center mt-4">
                        <span
                          style={{
                            cursor: "pointer",
                          }}
                          className="hover_element"
                        >
                          <CiMenuBurger
                            size={35}
                            onClick={viewToggleCardOnclick}
                          />
                        </span>
                        <span
                          style={{
                            cursor: "pointer",
                          }}
                          className="ms-2 hover_element"
                        >
                          <TfiMenuAlt
                            size={35}
                            onClick={viewToggleCardOnclick}
                          />
                        </span>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="mt-5 ms-5">
                    <CardBody>
                      <CardTitle tag="h5">Have a Feedback?</CardTitle>
                      <Button
                        style={{
                          backgroundColor: "#94E9C5",
                          color: "black",
                          fontWeight: "bold",
                        }}
                        onClick={toggle}
                      >
                        We're Listening!
                      </Button>
                    </CardBody>
                  </Card>

                  <div style={{ backgroundColor: "#EBF2F7" }}>
                    <Modal isOpen={modal} toggle={toggle} fullscreen>
                      <ModalHeader toggle={toggle}>
                        Thank you so much so taking time
                      </ModalHeader>
                      <ModalBody>
                        <FormData></FormData>
                      </ModalBody>
                    </Modal>
                  </div>
                </div>
              </Col>

              {/* ////////////////////////////////// */}
              <Col sm="9" className="full-height-col">
                <div
                  className="vertical-section"
                  style={{ backgroundColor: "#E5ECF2" }}
                >
                  {viewToggleCard ? (
                    <>
                      {posts
                        .slice((currentPage - 1) * 6, currentPage * 6)
                        .map((post) => (
                          <Card key={post.id} className="mb-3">
                            <CardBody>
                              <div className="d-flex justify-content-end">
                                <Button
                                  outline
                                  color="danger"
                                  style={{
                                    border: "none",
                                    textDecoration: "none",
                                  }}
                                  onClick={() => handleDelete(post.id)}
                                >
                                  X
                                </Button>
                              </div>
                              <CardTitle tag="h5">{post.title}</CardTitle>
                              <CardText>{post.body} </CardText>
                            </CardBody>
                          </Card>
                        ))}
                      <Pagination
                        className="d-flex justify-content-center"
                        aria-label="Page navigation"
                      >
                        <PaginationItem disabled={currentPage === 1}>
                          <PaginationLink
                            previous
                            onClick={() => handlePageChange(currentPage - 1)}
                          />
                        </PaginationItem>

                        {[...Array(Math.ceil(posts.length / 6)).keys()].map(
                          (page) => (
                            <PaginationItem
                              key={page + 1}
                              active={currentPage === page + 1}
                            >
                              <PaginationLink
                                onClick={() => handlePageChange(page + 1)}
                              >
                                {page + 1}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        )}

                        <PaginationItem
                          disabled={currentPage === Math.ceil(posts.length / 6)}
                        >
                          <PaginationLink
                            next
                            onClick={() => handlePageChange(currentPage + 1)}
                          />
                        </PaginationItem>
                      </Pagination>
                    </>
                  ) : (
                    <>
                      <div>
                        <Row className="mb-3">
                          {posts
                            .slice((currentPage - 1) * 6, currentPage * 6)
                            .map((post) => (
                              <Col sm="4" md="4" key={post.id}>
                                <Card className="mb-3">
                                  <span className="d-flex justify-content-end">
                                    <Button
                                      outline
                                      color="danger"
                                      style={{
                                        border: "none",
                                        textDecoration: "none",
                                      }}
                                      onClick={() => handleDelete(post.id)}
                                    >
                                      X
                                    </Button>
                                  </span>
                                  <CardBody>
                                    <CardTitle tag="h5">{post.title}</CardTitle>
                                    <CardText>{post.body} </CardText>
                                  </CardBody>
                                </Card>
                              </Col>
                            ))}
                        </Row>

                        <Pagination
                          className="d-flex justify-content-center"
                          aria-label="Page navigation"
                        >
                          <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink
                              previous
                              onClick={() => handlePageChange(currentPage - 1)}
                            />
                          </PaginationItem>

                          {[...Array(Math.ceil(posts.length / 6)).keys()].map(
                            (page) => (
                              <PaginationItem
                                key={page + 1}
                                active={currentPage === page + 1}
                              >
                                <PaginationLink
                                  onClick={() => handlePageChange(page + 1)}
                                >
                                  {page + 1}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          )}

                          <PaginationItem
                            disabled={
                              currentPage === Math.ceil(posts.length / 6)
                            }
                          >
                            <PaginationLink
                              next
                              onClick={() => handlePageChange(currentPage + 1)}
                            />
                          </PaginationItem>
                        </Pagination>
                      </div>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default App;
