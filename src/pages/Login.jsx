import React from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  let navigate = useNavigate();

  // Function to handle login
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h3 class="text-2xl font-semibold mb-6">Sign in with Google</h3>
        <button
          onClick={signInWithGoogle}
          class="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow-md transition duration-150 shadow "
        >
          <img
            class="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
