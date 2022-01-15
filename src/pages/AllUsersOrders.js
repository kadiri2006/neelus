import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function AllUsersOrders() {
  const [listOfOrders, setListOfOrders] = useState([]);
  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    let ordersList = [];
    querySnapshot.forEach((doc) => {
      ordersList.push({ ...doc.data(), orderId: doc.id });
    });
    setListOfOrders(ordersList);
  }, []);

  return (
    <div>
      {listOfOrders.map((item) => (
        <table className="table mt-3" key={item.orderId}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>OrderId</th>
            </tr>
          </thead>
          <tbody>
            {item.cartItems.map((item2, index) => (
              <tr key={index}>
                <td>
                  <img src={item2.imageURL} width="100rem" />
                </td>
                <td>{item2.name}</td>
                <td>{item2.price}</td>
                <td>{item.orderId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
