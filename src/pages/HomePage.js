import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fireBangles } from "../banglesData";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import "../stylesheets/product.css";

export default function HomePage() {
  let navigate = useNavigate();
  const [iniBangles, setInitialBangles] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let storeItems = useSelector((state) => state.cartReducer.cartItems);

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(storeItems));
  }, [storeItems]);

  useEffect(async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "bangles"));
    let updateBangles = [];
    querySnapshot.forEach((doc) => {
      updateBangles.push({ ...doc.data(), id: doc.id });
    });
    setInitialBangles(updateBangles);

    setLoading(false);
  }, []);

  const addToStore = (bangle) => {
    dispatch({ type: "ADD_TO_CART", payload: bangle });

    /* function addToLocalStorage(bangle) {
      let logic = localStorage.getItem("myCart");
      if (logic === null) {
        localStorage.setItem("myCart", JSON.stringify([bangle]));
      } else {
        let oldStore = JSON.parse(localStorage.getItem("myCart"));
        oldStore.push(bangle);
        localStorage.setItem("myCart", JSON.stringify(oldStore));
      }
    }
    addToLocalStorage(bangle); */
  };

  return (
    <div>
      <Layout loading={loading}>
        <div className="container">
          <div className="row ">
            {iniBangles.map((bangle) => (
              <div className="col-md-4" key={bangle.id}>
                <div className="product m-2 p-1 position-relative ">
                  <div className="before-action">
                    <p>{bangle.name}</p>

                    <img src={bangle.imageURL} className="product-img" />
                  </div>
                  <div className="after-action">
                    <p>Rs. {bangle.price}</p>
                    <div>
                      <button
                        className="btn btn-primary mx-1"
                        onClick={() => addToStore(bangle)}
                      >
                        ADD TO CART
                      </button>

                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`productInfo/${bangle.id}`)}
                      >
                        VIEW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}
