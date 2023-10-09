import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  //input value state management
  const timestamp = new Date();
  const [inputChange, setInputChange] = useState(false);
  const [postDetails, setPostDetails] = useState({
    title: "",
    postText: "",
    timestamp: timestamp,
  });

  //function to handle input change
  const handleChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    setPostDetails((prev) => {
      return { ...prev, [input]: value };
    });
    setInputChange(!inputChange);
    console.log(postDetails);
  };

  //createPost function
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  //adding the created post on firebase
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      postDetails,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
    // console.log("worked");
  };

  //protected router
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex gap-y-3">
      <div className="basis-1/2">
        <span className="">
          <h2 className="">create a post</h2>
        </span>
        <div className="">
          <label className="peer-placeholder-shown" for="title">
            title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="title"
            onChange={handleChange}
            className="peer form-input rounded-lg border-solid"
          />
        </div>
        <div className="">
          <label className="" for="postText">
            post
          </label>
          <textarea
            id="postText"
            name="postText"
            onChange={handleChange}
            className="form-textarea rounded-lg border-solid"
          />
        </div>
        <button className="" onClick={createPost}>
          submit post
        </button>
      </div>

      <div className="">output</div>
    </div>
  );
};

export default CreatePost;
