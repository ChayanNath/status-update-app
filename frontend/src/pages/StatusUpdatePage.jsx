import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusUpdateForm from "../components/StatusUpdate/StatusUpdateForm";
import { updateStatus } from "../api/statusApi";

const StatusUpdate = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState();
  const [errors, setErrors] = useState();

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      await updateStatus(values);
      setSubmitting(false);
      navigate("/dashboard");
    } catch (error) {
      setSubmitting(false);
      setErrors("Failed to update status");
    }
  };
  return (
    <StatusUpdateForm
      onSubmit={handleSubmit}
      loading={submitting}
      error={errors}
    ></StatusUpdateForm>
  );
};

export default StatusUpdate;
