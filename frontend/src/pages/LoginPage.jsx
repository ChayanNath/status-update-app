import LoginForm from "../components/Auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../redux/features/auth/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(loginUserThunk(values)).unwrap();
      navigate("/dashboard");
    } catch (error) {
      setSubmitting(false);
      setErrors({ submit: error });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
    </div>
  );
};

export default LoginPage;
