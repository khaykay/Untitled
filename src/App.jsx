import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      console.log("signed out");
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };
  return (
    <Router>
      <nav>
        <Link to="/">home</Link>

        {!isAuth ? (
          <Link to="/login"> Sign In to Create Post</Link>
        ) : (
          <div className="">
            <Link to="/createpost">createpost</Link>{" "}
            <button onClick={signUserOut}>sign out</button>
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/createpost" element={<CreatePost />}></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
