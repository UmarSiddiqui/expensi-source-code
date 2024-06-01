import { useState } from "react";
import { auth, provider, appleProvider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FcGoogle } from "react-icons/fc"; // Import colorful Google icon

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await signInWithPopup(auth, provider);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithApple = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await signInWithPopup(auth, appleProvider);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome to Expensi</h1>
        <h3> A simple expense tracker to help you stay on track</h3>
        <p>Sign In With Google or Apple to Continue</p>
        {error && <p className="error-message">{error}</p>}
        <div className="button-container">
          <button
            className="button login-with-google-btn"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            <FcGoogle className="icon" /> {loading ? "Signing In..." : "  Continue with Google"}
          </button>
          <button
            className="button login-with-apple-btn"
            onClick={signInWithApple}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faApple} className="icon white-icon" /> {loading ? "Signing In..." : "  Continue with Apple"}
          </button>
        </div>
      </div>
    </div>
  );
};

