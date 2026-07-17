import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthSuccess = () => {

  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {

    const token = params.get("token");
    const user = params.get("user");

    if (!token || !user) {
      navigate("/login", { replace: true });
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      decodeURIComponent(user)
    );

    navigate("/dashboard", {
      replace: true,
    });

  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      Signing you in...
    </div>
  );

};

export default AuthSuccess;