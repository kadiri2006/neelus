import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { MdDeleteOutline } from "react-icons/md";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function CartPage() {
  let storeItems = useSelector((state) => state.cartReducer.cartItems);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deliveyData, setDeliveryData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  });

  const updateDeliveyData = (key, value) => {
    let initialData = deliveyData;
    switch (key) {
      case "name":
        setDeliveryData({ ...initialData, name: value });
        break;
      case "address":
        setDeliveryData({ ...initialData, address: value });
        break;
      case "city":
        setDeliveryData({ ...initialData, city: value });
        break;
      case "state":
        setDeliveryData({ ...initialData, state: value });
        break;
      case "pin":
        {
          if (parseInt(value) <= 999999) {
            setDeliveryData({ ...initialData, pin: value });
          } else {
            setDeliveryData({ ...initialData, pin: "" });
          }
        }
        break;

      default:
        setDeliveryData(initialData);
        break;
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    const orderInfo = {
      cartItems: storeItems,
      addressInfo: deliveyData,
      email: JSON.parse(localStorage.getItem("verifiedUser")).email,
      uid: JSON.parse(localStorage.getItem("verifiedUser")).uid,
    };

    console.log(orderInfo);

    try {
      const orderRef = await addDoc(collection(db, "orders"), orderInfo);
      console.log(orderRef.id);
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setShow(false);
    }, 1000);
    console.log("sucess");
  };

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(storeItems));
  }, [storeItems]);

  function totalPrice() {
    let sum = 0;
    storeItems.forEach((element) => (sum += element.price));
    return sum;
  }

  return (
    <div>
      <Layout>
        <div className="py-2">
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {storeItems.map((item) => (
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
                        onClick={() =>
                          dispatch({
                            type: "DELETE_FROM_CART",
                            payload: item,
                          })
                        }
                      />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal show={show} onHide={handleOrder}>
            <Modal.Title>Delivey Address</Modal.Title>
            <Modal.Body>
              <Form onSubmit={handleOrder}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First Name"
                      maxLength="8"
                      onChange={(e) =>
                        updateDeliveyData("name", e.target.value)
                      }
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    required
                    placeholder="1234 Main St"
                    maxLength="30"
                    onChange={(e) =>
                      updateDeliveyData("address", e.target.value)
                    }
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      onChange={(e) =>
                        updateDeliveyData("city", e.target.value)
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select
                      required
                      defaultValue="Choose..."
                      onChange={(e) =>
                        updateDeliveyData("state", e.target.value)
                      }
                    >
                      <option>Choose...</option>
                      <option>AndhraPradesh</option>
                      <option>TamilNadu</option>
                      <option>Karnataka</option>
                      <option>Punjab</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      value={deliveyData.pin}
                      onChange={(e) => updateDeliveyData("pin", e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Button type="submit">PlaceOrder</Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="d-flex justify-content-end  ">
            <p className="total-amount">Total Amount={totalPrice()} Rs/-</p>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-warning" onClick={() => setShow(true)}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}
