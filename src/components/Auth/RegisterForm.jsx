import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import Notification from "../Notification";

const RegisterForm = () => {
  const [showNotification, setShowNotification] = useState(false);
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      try {
        register(values.name, values.email, values.password);
        setShowNotification(true);
      } catch (error) {
        setErrors({ email: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <h2>Welcome</h2>
        <p>Please register a new account</p>
        <div className="form-input">
          <input
            placeholder="Full name"
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="form-input">
          <input
            placeholder="Email address"
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="form-input">
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          style={{ marginTop: "20px" }}
        >
          Register
        </button>
      </form>
      {showNotification && (
        <Notification
          message="Registration Successful!"
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
};

export default RegisterForm;
