import { doc, updateDoc } from "firebase/firestore";

import { collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import Layout from "../components/Layout";
import { db } from "../firebase";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [allItems, setAllItems] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [add, setAdd] = useState(false);

  const [deliveyData, setDeliveryData] = useState({
    name: "",
    imageURL: "",
    category: "",
    price: 0,
    id: "",
    description: "",
  });

  const updateDeliveyData = (key, value) => {
    let initialData = deliveyData;
    switch (key) {
      case "name":
        setDeliveryData({ ...initialData, name: value });
        break;
      case "imageURL":
        setDeliveryData({ ...initialData, imageURL: value });
        break;
      case "category":
        setDeliveryData({ ...initialData, category: value });
        break;
      case "price":
        setDeliveryData({ ...initialData, price: value });
        break;
      case "description":
        setDeliveryData({ ...initialData, description: value });
        break;

      default:
        setDeliveryData(initialData);
        break;
    }
  };

  useEffect(async () => {
    setLoading(true);
    await getAllProducts();
    setLoading(false);
  }, []);

  async function getAllProducts() {
    const querySnapshot = await getDocs(collection(db, "bangles"));
    let updateBangles = [];
    querySnapshot.forEach((doc) => {
      updateBangles.push({ ...doc.data(), id: doc.id });
    });
    setAllItems(updateBangles);
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const bangleRef = doc(db, "bangles", deliveyData.id);
    await updateDoc(bangleRef, {
      name: deliveyData.name,
      imageURL: deliveyData.imageURL,
      category: deliveyData.category,
      price: deliveyData.price,
    });
    getAllProducts();

    setShow(false);
  };

  const displayModal = (item, test) => {
    if (test === "edit") {
      setAdd(false);
    }
    if (item === undefined) {
      setDeliveryData({
        name: "",
        imageURL: "",
        category: "",
        price: 0,
        id: "",
      });
    } else {
      setDeliveryData({
        name: item.name,
        imageURL: item.imageURL,
        category: item.category,
        price: item.price,
        id: item.id,
      });
    }

    setShow(true);
  };

  const handleAdd = () => {
    setAdd(true);
    displayModal();
  };

  const sendToServer = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "bangles"), {
      name: deliveyData.name,
      imageURL: deliveyData.imageURL,
      category: deliveyData.category,
      price: deliveyData.price,

      description: deliveyData.description,
    });
    window.location.reload();
  };

  const handleDelete = async (item) => {
    await deleteDoc(doc(db, "bangles", item.id));
    setLoading(true);
    await getAllProducts();
    setLoading(false);
  };

  return (
    <div>
      <Layout loading={loading}>
        <div className="d-flex">
          <h3>Products List</h3>
          <button
            className="btn btn-primary btn-sm m-1 ms-auto"
            onClick={handleAdd}
          >
            AddProduct
          </button>
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.imageURL} width="100rem" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  {
                    <MdDeleteOutline
                      fontSize="30px"
                      cursor="pointer"
                      onClick={() => handleDelete(item)}
                    />
                  }
                </td>
                <td>
                  {
                    <BiEdit
                      fontSize="30px"
                      cursor="pointer"
                      onClick={() => displayModal(item, "edit")}
                    />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={show} onHide={add ? sendToServer : handleEdit}>
          <Modal.Title>{add ? "Add Product" : "Edit Details"}</Modal.Title>
          <Modal.Body>
            <Form onSubmit={add ? sendToServer : handleEdit}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Control
                    value={deliveyData.name}
                    type="text"
                    placeholder="name"
                    onChange={(e) => updateDeliveyData("name", e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Control
                    value={deliveyData.imageURL}
                    type="text"
                    placeholder="imageURL"
                    onChange={(e) =>
                      updateDeliveyData("imageURL", e.target.value)
                    }
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Control
                    value={deliveyData.price}
                    type="number"
                    placeholder="price"
                    onChange={(e) => updateDeliveyData("price", e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Control
                    value={deliveyData.category}
                    type="text"
                    placeholder="category"
                    onChange={(e) =>
                      updateDeliveyData("category", e.target.value)
                    }
                  />
                </Form.Group>
              </Row>
              {add && (
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Control
                      value={deliveyData.description}
                      type="text"
                      placeholder="description"
                      onChange={(e) =>
                        updateDeliveyData("description", e.target.value)
                      }
                    />
                  </Form.Group>
                </Row>
              )}

              <Button type="submit">{add ? "ADD" : "UPDATE"}</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Layout>
    </div>
  );
}
