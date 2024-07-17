import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterForm = ({ onSubmit, loading, error }) => (
  <Formik
    initialValues={{
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
    }}
    validationSchema={RegisterSchema}
    onSubmit={onSubmit}
  >
    {({ errors, touched }) => (
      <Form className="p-4 max-w-sm mx-auto">
        <div className="mb-4 text-lg text-center">Create an account</div>
        <div className="mb-4">
          <Field
            name="firstName"
            placeholder="First name"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
          <ErrorMessage
            name="firstName"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <div className="mb-4">
          <Field
            name="lastName"
            placeholder="Last name"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
          <ErrorMessage
            name="lastName"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <div className="mb-4">
          <Field
            name="username"
            placeholder="Username"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
          <ErrorMessage
            name="username"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <div className="mb-4">
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
          />
          {errors.password && touched.password ? (
            <div className="text-red-500 text-sm">{errors.password}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <Field
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
          />
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
        >
          {loading ? "Hooking you up..." : "Register"}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </Form>
    )}
  </Formik>
);

export default RegisterForm;
