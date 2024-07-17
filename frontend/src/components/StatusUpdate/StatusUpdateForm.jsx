import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const StatusSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const StatusUpdateForm = ({ onSubmit, loading, error }) => (
  <Formik
    initialValues={{ title: "", description: "" }}
    validationSchema={StatusSchema}
    onSubmit={onSubmit}
  >
    {({ errors, touched }) => (
      <Form className="p-4 max-w-sm mx-auto">
        <div className="mb-2 text-3xl">Daily Status Update</div>
        <p className="mb-4">Fill out your daily status update.</p>
        <div className="mb-4">
          <Field
            name="title"
            placeholder="What did you work on today?"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
          />
          {errors.title && touched.title ? (
            <div className="text-red-500 text-sm">{errors.title}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <Field
            type="description"
            name="description"
            component="textarea"
            placeholder="Enter a longer description"
            rows="6"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
          />
          {errors.description && touched.description ? (
            <div className="text-red-500 text-sm">{errors.description}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </Form>
    )}
  </Formik>
);
export default StatusUpdateForm;
