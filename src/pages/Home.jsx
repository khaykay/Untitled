import { getDocs, collection, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import and from "/and.svg";

const Home = () => {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  // Query documents and order them by the 'timestamp' field in descending order
  const sortPostByRecent = (array) => {
    return array.sort((a, b) => {
      const timeA = new Date(a.timestamp);
      const timeB = new Date(b.timestamp);
      return timeB.getTime() - timeA.getTime();
    });
  };
  //fetch posts from firebase
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);

        setPostLists(
          sortPostByRecent(
            data.docs.map((doc) => {
              const post = doc.data();
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              // console.log(post);
              return {
                ...post,

                timestamp: new Timestamp(
                  post.postDetails.timestamp.seconds,
                  post.postDetails.timestamp.nanoseconds
                )
                  .toDate()
                  .toLocaleString("en-US", options),

                id: doc.id,
              };
            })
          )
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPosts();
  }, []);
  // console.log(postLists);
  return (
    <div className="px-12 py-2 mt-6">
      <header className="border-solid border-b-2 pb-4">
        <h2 className="text-4xl">
          The Journal: Design Resources
          <span className="">
            <img
              src={and}
              alt=""
              className="h-8 w-8 md:h-9 md:w- inline mx-2"
            />
          </span>
          Interviews
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {postLists &&
          postLists.map((post, index) => {
            return (
              <div
                className={index === 0 ? "col-span-full" : "col-span-1"}
                key={post.id}
              >
                <div className="bg-gray-200 p-4">
                  {/* Assuming the background color and padding are for styling purposes */}
                  {post.postDetails?.title}
                  {post.timestamp}
                  {post.author.name}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
