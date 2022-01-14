import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import MyError from "./MyError";
import YupPassword from "yup-password";
import "../stylesheets/product.css";

YupPassword(yup);

export default function LoginPage() {
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = (values, { resetForm }) => {
    resetForm();
    alert("submitted");
    console.log(values);
  };
  const validationSchema = yup.object({
    email: yup.string().email().required("email not be blank"),

    password: yup.string().password().min(5).required("pass not to be blank"),
  });

  return (
    <div className="parent-register bg-secondary d-flex flex-column align-items-center vh-100 justify-content-center ">
      <div className="row ">
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
        <div className="col-md-5 form-shadow">
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

                <button className="">LOGIN</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
