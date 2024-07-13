import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ username: "", password: "" }}
    validationSchema={LoginSchema}
    onSubmit={onSubmit}
  >
    {({ errors, touched }) => (
      <Form className="p-4 max-w-sm mx-auto">
        <div className="mb-4 text-lg text-center">Let's get started</div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <Field
            name="username"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
          />
          {errors.username && touched.username ? (
            <div className="text-red-500 text-sm">{errors.username}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <Field
            type="password"
            name="password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
          />
          {errors.password && touched.password ? (
            <div className="text-red-500 text-sm">{errors.password}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
        >
          Login
        </button>
      </Form>
    )}
  </Formik>
);

export default LoginForm;
