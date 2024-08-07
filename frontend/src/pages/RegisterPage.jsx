import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserThunk } from "../redux/features/auth/authSlice";
import RegisterForm from "../components/Auth/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(registerUserThunk(values)).unwrap();
      navigate("/login");
    } catch (error) {
      setSubmitting(false);
      if (error && error.message) {
        setErrors({ submit: error.message });
      } else {
        setErrors({ submit: "An error occurred. Please try again." });
      }
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
    </div>
  );
};

export default RegisterPage;
