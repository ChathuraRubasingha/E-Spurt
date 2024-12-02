import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";

const LoginForm = () => {
  const [showNotification, setShowNotification] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await login(values.email, values.password);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          navigate("/home");
        }, 2000);
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
        <h2>Welcome Back</h2>
        <p>Please login to your account</p>
        <div className="form-input">
          <input
            placeholder="Email address"
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div className="forget-password">Forgot Password?</div>
        <button type="submit" disabled={formik.isSubmitting}>
          Login
        </button>
      </form>

      {showNotification && (
        <Notification
          message="Login successful!"
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
};

export default LoginForm;
