import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import logo from "/untitled.svg";

function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  // Function to handle logout
  const signUserOut = () => {
    signOut(auth).then(() => {
      console.log("signed out");
      localStorage.removeItem("isAuth");
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };
  return (
    <Router>
      <nav className="px-8 md:px-16 py-3 flex items-center justify-between border-t-8 border-[#FFF700] border-solid">
        <Link to="/">
          <div className="inline-flex gap-2 items-center">
            <span className="">
              <img src={logo} alt="" className="h-8 w-8 md:h-10 md:w-10" />
            </span>
            <span className="font-bold ">
              Unt<span className="italic">i</span>tled
            </span>
          </div>
        </Link>

        {!isAuth ? (
          <Link to="/login">
            {" "}
            <span className="bg-[#121826] text-white outline-[#FFF700]   outline outline-offset-2  rounded-2xl text-xs py-2 px-3">
              <span className="">Sign In to Create Post</span>
            </span>{" "}
          </Link>
        ) : (
          <div className="">
            <Link to="/createpost">createpost</Link>{" "}
            <button onClick={signUserOut}>sign out</button>
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/createpost"
          element={<CreatePost isAuth={isAuth} />}
        ></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
