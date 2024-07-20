import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import MultiSelect from "../ui/MultiSelect";

const AddTeamSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  teamMembers: Yup.array()
    .min(1, "At least one team member is required")
    .required("Required"),
});

const AddTeamForm = ({ onSubmit, initialValues, loading, error, users }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddTeamSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="p-4 max-w-sm mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Team name
            </label>
            <Field
              name="name"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
            {errors.name && touched.name ? (
              <div className="text-red-500 text-sm">{errors.name}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="teamMembers" className="block text-gray-700">
              Team members
            </label>
            <Field
              name="teamMembers"
              component={MultiSelect}
              options={users}
              isMulti={true}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
            {errors.teamMembers && touched.teamMembers ? (
              <div className="text-red-500 text-sm">{errors.teamMembers}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Adding team..." : "Add Team"}
          </button>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default AddTeamForm;
