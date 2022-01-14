import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import MyError from "./MyError";
import YupPassword from "yup-password";
import "../stylesheets/product.css";
import { Link } from "react-router-dom";

YupPassword(yup);

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setErrorMsg("");
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setLoading(false);
        await localStorage.setItem("verifiedUser", JSON.stringify(user.email));
        window.location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        setErrorMsg(errorMessage);
      });

    resetForm();
  };
  const validationSchema = yup.object({
    email: yup.string().email().required("email not be blank"),

    password: yup.string().password().min(5).required("pass not to be blank"),
  });

  return (
    <div className="parent-register bg-secondary d-flex flex-column align-items-center vh-100 justify-content-center ">
      <div className="row form-shadow ">
        <div className="col-md-5">
          <lottie-player
            src="https://assets6.lottiefiles.com/packages/lf20_yupefrh2.json"
            background="transparent"
            speed="1"
            loop
            style={{ width: "300px", height: "300px" }}
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-5 mt-5 mx-3 ">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <div className=" d-flex flex-column align-items-center">
                <h3>Login</h3>

                <label htmlFor="email">email:</label>
                <Field name="email" className="mx-8" />
                <ErrorMessage name="email" component={MyError} />
                <label htmlFor="password">password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component={MyError} />
                <button type="submit">LOGIN</button>
                <div>
                  {loading && <p>loading....</p>}
                  <span className="text-danger">{errorMsg}</span>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <div>
        NewUser ?<Link to="/register">SignUp</Link>
      </div>
    </div>
  );
}
