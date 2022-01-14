import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import MyError from "./MyError";
import YupPassword from "yup-password";
import "../stylesheets/product.css";

YupPassword(yup);

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setLoading(false);
        setTimeout(() => {
          alert("signup sucessfully");
        }, 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        setTimeout(() => {
          alert(`signup failed : ${errorMessage}`);
        }, 1000);
      });

    resetForm();
  };
  const validationSchema = yup.object({
    email: yup.string().email().required("email not be blank"),

    password: yup.string().password().min(5).required("pass not to be blank"),

    confirmPassword: yup
      .string()
      .required("fill this field")
      .when("password", {
        is: (value) => (value ? true : false),
        then: yup
          .string()
          .oneOf(
            [yup.ref("password")],
            " my :its must match with password field"
          ),
      }),
  });

  return (
    <div className="parent-register bg-secondary d-flex flex-column align-items-center vh-100 justify-content-center ">
      <div className="row ">
        <div className="col-md-5">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_gjmecwii.json"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "300px" }}
            loop
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
                <h3>Register</h3>

                <label htmlFor="email">email:</label>
                <Field name="email" className="mx-8" />
                <ErrorMessage name="email" component={MyError} />
                <label htmlFor="password">password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component={MyError} />
                <label htmlFor="confirmPassword">confirmPassword</label>
                <Field type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component={MyError} />
                <button type="submit">REGISTER</button>
                {loading && <p>loading....</p>}
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
