import { useNavigate } from "react-router";
import Navbar from "../Navbar/navbar";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import axios from "axios";
import "../Register/login.css";
import { Link } from "react-router-dom";
import Footer from "../Navbar/Footer";
function Registration() {
  const nav = useNavigate();

  const initialvalues = {
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  };

  const [responseData, setResponseData] = useState({
    responseText: "",
    responseClass: "",
  });

  const validationschema = Yup.object({
    name: Yup.string("Please Enter a valid Name").required(
      "This field is required !"
    ),
    email: Yup.string()
      .email("Please enter a valid E-Mail")
      .required("This field is required !"),
    phone: Yup.string().required("This field is required !"),
    username: Yup.string("Please Enter a valid  username"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must contain 6 Minimum charecters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .required("This field is required !")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  async function onSubmit(values, { resetForm }) {
    console.log(values);
    await axios
      .post("http://127.0.0.1:8000/api/users/signup/", values)

      .then(
        (response) => {
          setResponseData({
            responseText: "User Registration Successfull Please signin",
            responseClass: "alert alert-success",
          });
          setTimeout(() => {
            nav("/login", true);
          }, 1000);
        },
        (error) => {
          setResponseData({
            responseText: "Registration Failed!",
            responseClass: "alert alert-danger",
          });
        }
      )
      .catch((error) => {
        console.log(error);
      });

    resetForm();
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="signinForm">
        <div className="container maincontainer">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="mainform">
                {/* <h1 className="logg">Registration</h1> */}
                <h2 className="welcomeText">WELCOME</h2>
                <h2 className="welcomeSubText">TO BOLETO</h2>
                <div className={responseData.responseClass} role="alert">
                  {responseData.responseText}
                </div>
                <Formik
                  initialValues={initialvalues}
                  validationSchema={validationschema}
                  validateOnMount
                  onSubmit={onSubmit}
                >
                  {(formik) => {
                    return (
                      <Form>
                        <div className="form-group">
                          <label htmlFor="">Name</label>
                          <Field
                            style={{ backgroundColor: "#0a1e5e" }}
                            placeholder="Enter your name"
                            type="text"
                            name="name"
                            className={
                              formik.errors.name && formik.touched.name
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                          />
                          <ErrorMessage name="name">
                            {(errormessage) => (
                              <small className="text-danger">
                                {errormessage}
                              </small>
                            )}
                          </ErrorMessage>
                        </div>

                        <div className="form-group">
                          <label htmlFor="">E-Mail</label>
                          <Field
                            style={{ backgroundColor: "#0a1e5e" }}
                            placeholder="Enter you email"
                            type="email"
                            name="email"
                            className={
                              formik.errors.email && formik.touched.email
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                          />
                          <ErrorMessage name="email">
                            {(errormessage) => (
                              <small className="text-danger">
                                {errormessage}
                              </small>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Phone No.</label>
                          <Field
                            style={{ backgroundColor: "#0a1e5e" }}
                            placeholder="Enter your phone num"
                            type="mobile"
                            name="phone"
                            className={
                              formik.errors.phone && formik.touched.phone
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                          />
                          <ErrorMessage name="mobile">
                            {(errormessage) => (
                              <small className="text-danger">
                                {errormessage}
                              </small>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Username</label>
                          <Field
                            style={{ backgroundColor: "#0a1e5e" }}
                            placeholder="Enter username"
                            type="text"
                            name="username"
                            className={
                              formik.errors.username && formik.touched.username
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                          />
                          <ErrorMessage name="username">
                            {(errormessage) => (
                              <small className="text-danger">
                                {errormessage}
                              </small>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Password</label>
                          <Field
                            style={{ backgroundColor: "#0a1e5e" }}
                            placeholder="Enter Password"
                            type="password"
                            name="password"
                            className={
                              formik.errors.password && formik.touched.password
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                          />
                          <ErrorMessage name="password">
                            {(errormessage) => (
                              <small className="text-danger">
                                {errormessage}
                              </small>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Confirm Password</label>
                          <Field
                            style={{ backgroundColor: "#0a1e5e" }}
                            placeholder="Re-enter your password"
                            type="password"
                            name="confirmPassword"
                            className={
                              formik.errors.confirmPassword &&
                              formik.touched.confirmPassword
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                          />
                          <ErrorMessage name="confirmPassword">
                            {(errormessage) => (
                              <small className="text-danger">
                                {errormessage}
                              </small>
                            )}
                          </ErrorMessage>
                        </div>
                        <input
                          type="submit"
                          value="Register"
                          disabled={!formik.isValid}
                          className="Reg"
                        />
                      </Form>
                    );
                  }}
                </Formik>
                <p className="text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{ display: "inline", marginLeft: "1px" }}
                  >
                    Click here
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Registration;
