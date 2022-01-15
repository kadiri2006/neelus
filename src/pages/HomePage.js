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
  const [search, setSearch] = useState({
    word: "",
    select: "",
  });

  function onFilter(key, value) {
    switch (key) {
      case "word":
        setSearch({ ...search, word: value.toLowerCase() });
        break;
      case "select":
        setSearch({ ...search, select: value });
        break;

      default:
        setSearch({ ...search });
        break;
    }
  }

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
  };

  return (
    <div>
      <Layout loading={loading}>
        <div className="d-flex p-1">
          <input
            placeholder="Search Items.."
            type="text"
            onChange={(e) => onFilter("word", e.target.value)}
          />
          <select
            name=""
            id=""
            onChange={(e) => onFilter("select", e.target.value)}
            className="ms-auto"
          >
            <option value="">select</option>
            <option value="bangles">bangles</option>
            <option value="earrings">earrings</option>
          </select>
        </div>
        <div className="container">
          <div className="row ">
            {iniBangles
              .filter((item) => item.name.includes(search.word))
              .filter((item) => item.category.includes(search.select))
              .map((bangle) => (
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
