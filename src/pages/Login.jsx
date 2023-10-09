import React from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  return (
    <div className="min-h-screen">
      {/* <p className="">Sign In With Google to Continue</p>
      <button className="" onClick={signInWithGoogle}>
        Sign in with Google
      </button> */}
      <div
        class="flex flex-col items-center justify-center h-full"
        // style={{ height: "calc(100vh-70px)", backgroundColor: "green" }}
      >
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
