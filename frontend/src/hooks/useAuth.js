import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import { getCookie } from "../utils/cookies";

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetails = getCookie("userDetails");
    if (userDetails) {
      try {
        const decodedUserDetails = decodeURIComponent(userDetails);
        const user = JSON.parse(decodedUserDetails);
        dispatch(setUser(user));
      } catch (error) {
        console.error("Failed to parse user details from cookie", error);
      }
    }
  }, [dispatch]);
};
