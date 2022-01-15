import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { db } from "../firebase";

export default function OrdersPage() {
  const [listOfOrders, setListOfOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loggedUid = JSON.parse(localStorage.getItem("verifiedUser")).uid;

  useEffect(async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "orders"));
    let ordersList = [];
    querySnapshot.forEach((doc) => {
      ordersList.push({ ...doc.data(), orderId: doc.id });
    });
    setListOfOrders(ordersList);

    setLoading(false);
  }, []);

  return (
    <div>
      <Layout loading={loading}>
        <div>
          {listOfOrders
            .filter((item) => item.uid === loggedUid)
            .map((item) => (
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
      </Layout>
    </div>
  );
}
