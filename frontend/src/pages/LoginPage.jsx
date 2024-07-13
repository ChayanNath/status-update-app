import LoginForm from "../components/Auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { setAuthToken } from "../api";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const data = await loginUser(values);
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      navigate("/dashboard");
    } catch (error) {
      setSubmitting(false);
      if (error.response && error.response.data) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: "An error occurred. Please try again." });
      }
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
