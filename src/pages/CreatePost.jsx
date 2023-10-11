import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  const timestamp = new Date();
  const [inputChange, setInputChange] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState([]);
  const [postDetails, setPostDetails] = useState({
    thumbnail: "src/assets/thumbnail.png",
    title: "",
    postText: "",
    tags: tags,
    timestamp: timestamp,
  });

  //handle adding thumbnail picture

  const getThumbnail = async (e) => {
    const imageFile = e.target.files[0];

    if (!imageFile) {
      return;
    }

    // Validate file size
    const fileSize = imageFile.size / 1024;
    const fileSizeLimitMB = 1.5;
    const fileSizeLimitKB = fileSizeLimitMB * 1024;
    if (fileSize > fileSizeLimitKB) {
      console.log(
        "File size exceeds the limit (1.5 MB). Please choose a smaller file."
      );
      return;
    }

    try {
      const thumbnail = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const image = new Image();
          image.src = e.target.result;
          resolve(e.target.result);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(imageFile);
      });

      setPostDetails((prev) => {
        return { ...prev, thumbnail };
      });

      setInputChange(!inputChange);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  //handle adding tags
  const handleKeyDown = (e) => {
    if (e.key !== "Enter" || tags.length >= 4) return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    setTagsInput("");
  };

  //handle the changes in input field
  const handleChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    setPostDetails((prev) => {
      return { ...prev, [input]: value };
    });
    setInputChange(!inputChange);
  };

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  //create post and add to fire store function
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      postDetails: {
        ...postDetails,
        tags: tags,
      },
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });

    navigate("/");
  };

  //protected routing
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex gap-y-3 h-[90%] bg-slate-400 items-center">
      <div className="basis-1/2 h-full flex flex-col items-center justify-center">
        <h2 className="mb-4 font-mono font-semibold text-2xl">Create a Post</h2>
        <div className=" bg-white h-[80%] flex flex-col w-[80%] rounded-xl shadow-md px-8 py-6 gap-4">
          <span className="flex flex-col">
            <label htmlFor="logo" className="text-xs text-slate-500 ">
              Thumbnail
            </label>
            <input
              type="file"
              name="logo"
              onChange={getThumbnail}
              className="  border py-2 pr-1 rounded-lg text-xs text-slate-500 border-solid
                file:mr-2 file:ml-1 file:py-2 file:px-3
                file:rounded-full file:border-0
                file:text-xs file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
                md:file:text-[10px]
                md:file:mr-1
                md:file:px-2 
              "
            />
          </span>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-xs text-slate-500 ">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              className="peer form-input rounded-lg border-solid placeholder:text-xs text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="postText" className="text-xs text-slate-500 ">
              Post Content
            </label>
            <textarea
              id="postText"
              name="postText"
              placeholder="Content goes here ..."
              onChange={handleChange}
              className="form-textarea rounded-lg border-solid h-[100px] placeholder:text-xs text-sm"
            />
          </div>
          <div className="">
            <div className="border border-solid  rounded-lg ">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 py-1 px-[6px] rounded-xl text-xs mx-1"
                >
                  {tag}
                  <span
                    className=" inline-flex bg-gray-600 h-5 w-5 justify-center items-center rounded-xl ml-[0.5em] text-white"
                    onClick={() => {
                      // Remove the tag when the 'x' is clicked
                      setTags(tags.filter((_, i) => i !== index));
                    }}
                  >
                    x
                  </span>
                </span>
              ))}
              <input
                id="tags"
                type="text"
                name="tags"
                placeholder="Add Tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="form-input  placeholder:text-xs text-sm w-full focus:mt-2 "
              />
            </div>
            <div>
              <p className="text-xs text-slate-500">
                Remaining Tags: {4 - tags.length}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center text-sm ">
            <span
              onClick={createPost}
              className="w-fit bg-slate-400 px-4 py-2 rounded-md"
            >
              Publish Post
            </span>
          </div>
        </div>
      </div>
      <div>Output</div>
    </div>
  );
};

export default CreatePost;
