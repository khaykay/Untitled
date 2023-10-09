import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

const Home = () => {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  // Query documents and order them by the 'timestamp' field in descending order
  const sortArrayByRecent = (array) => {
    return array.sort((a, b) => {
      const timeA = new Date(a.time);
      const timeB = new Date(b.time);
      return timeB.getTime() - timeA.getTime();
    });
  };
  //fetch posts from firebase
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostLists(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        console.log(postLists);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPosts();
  }, []);

  return (
    <div>
      <div className="">
        {postLists &&
          postLists?.map((post) => {
            return (
              <div className="" key={post.id}>
                {post.postDetails?.title}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
