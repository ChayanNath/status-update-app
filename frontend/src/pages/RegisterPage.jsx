import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/Auth/RegisterForm";
import { registerUser } from "../api/authApi";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      await registerUser(values);
      navigate("/login");
    } catch (error) {
      setSubmitting(false);
      if (error.response && error.response.data) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: "An error occurred. Please try again." });
      }
    }
  };

  return <RegisterForm onSubmit={handleRegister} />;
};

export default RegisterPage;
