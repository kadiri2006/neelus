import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { MdDeleteOutline } from "react-icons/md";

export default function CartPage() {
  let storeItems = useSelector((state) => state.cartReducer.cartItems);
  const dispatch = useDispatch();

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
          <div className="d-flex justify-content-end  ">
            <p className="total-amount">Total Amount={totalPrice()} Rs/-</p>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-warning">PLACE ORDER</button>
          </div>
        </div>
      </Layout>
    </div>
  );
}
