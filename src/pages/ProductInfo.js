import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";

export default function ProductInfo() {
  const [singleData, setSingleData] = useState({});
  const [loading, setLoading] = useState(false);
  let { prodId } = useParams();
  const dispatch = useDispatch();

  const docRef = doc(db, "bangles", prodId);

  useEffect(async () => {
    setLoading(true);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setSingleData(docSnap.data());
    } else {
      console.log("No such document!");
    }
    setLoading(false);
  }, []);

  const addToStore = (singleData) => {
    singleData.id = prodId;

    dispatch({ type: "ADD_TO_CART", payload: singleData });
  };

  return (
    <div>
      <Layout loading={loading}>
        {Object.keys(singleData).length > 0 && (
          <div className="container my-1">
            <div className="row justify-content-center ">
              <div className="col-sm-5 col-md-4  text-center ">
                <p>{singleData.name}</p>
                <img
                  src={singleData.imageURL}
                  alt="productImage"
                  className="w-100 "
                />
                <p>{singleData.description}</p>
                <div className="d-flex justify-content-center ">
                  <button
                    className="btn btn-primary"
                    onClick={() => addToStore(singleData)}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}
