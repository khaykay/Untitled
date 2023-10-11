import {
  getDocs,
  collection,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import and from "/and.svg";
import arrow from "/arrow.svg";

const Home = () => {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  // Query documents and order them by the 'timestamp' field in descending order
  // const sortPostByRecent = (array) => {
  //   return array.sort((a, b) => {
  //     const timeA = new Date(a.timestamp);
  //     const timeB = new Date(b.timestamp);
  //     return timeB.getTime() - timeA.getTime();
  //   });
  // };
  const sortPostByRecent = (array) => {
    return array.sort((a, b) => {
      const timeA =
        a.timestamp instanceof Date ? a.timestamp : new Date(a.timestamp);
      const timeB =
        b.timestamp instanceof Date ? b.timestamp : new Date(b.timestamp);
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

  //fetch posts from firebase
  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       const data = await getDocs(postsCollectionRef);

  //       const postsData = sortPostByRecent(
  //         data.docs.map((doc) => {
  //           const post = doc.data();
  //           const options = {
  //             year: "numeric",
  //             month: "long",
  //             day: "numeric",
  //           };
  //           return {
  //             ...post,
  //             timestamp: new Timestamp(
  //               post.postDetails.timestamp.seconds,
  //               post.postDetails.timestamp.nanoseconds
  //             )
  //               .toDate()
  //               .toLocaleString("en-US", options),
  //             id: doc.id,
  //           };
  //         })
  //       );

  //       // Store the posts data in local storage
  //       localStorage.setItem("postsData", JSON.stringify(postsData));

  //       setPostLists(postsData);
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     }
  //   };

  //   // Check if postsData is available in local storage
  //   const storedPostsData = localStorage.getItem("postsData");
  //   if (storedPostsData) {
  //     setPostLists(JSON.parse(storedPostsData));
  //   } else {
  //     // Fetch data from Firebase if not available in local storage
  //     getPosts();
  //   }
  // }, []);

  console.log(postLists);

  //delete post
  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);

      // Update the local state after successful deletion
      setPostLists((prevPostLists) => {
        return prevPostLists.filter((post) => post.id !== id);
      });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="px-8 md:px-16 py-2 mt-10">
      <header className="border-solid border-b-2 pb-4">
        <h2 className="text-3xl md:text-4xl">
          The Journal: Design Resources
          <span className="">
            <img
              src={and}
              alt=""
              className="h-8 w-8 md:h-9 md:w- inline mx-2 "
            />
          </span>
          Interviews
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {postLists &&
          postLists.map((post, index) => {
            return (
              <div
                className={
                  index === 0
                    ? "col-span-full   mt-8 mb-5 rounded-tl-[80px] relative"
                    : "col-span-1"
                }
                key={post.id}
              >
                <article
                  className={
                    index === 0
                      ? "border-solid  bg-gray-200 h-[400px] rounded-tl-[80px] relative"
                      : " h-[335px]"
                  }
                >
                  <span className="">
                    <img
                      src={post.postDetails?.thumbnail}
                      alt=""
                      className={
                        index === 0
                          ? "border-solid border-black border-[1.5px] w-full  h-full rounded-tl-[80px] relative"
                          : "h-[200px] w-full object-cover border-solid border-black border-[1.5px]"
                      }
                    />
                  </span>
                  {/* Assuming the background color and padding are for styling purposes */}
                  <div
                    className={
                      index === 0
                        ? "w-full flex justify-center text-white absolute bottom-6"
                        : ""
                    }
                  >
                    <div
                      className={
                        index === 0
                          ? "   w-[95%] bg-opacity-20 bg-blur-lg bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-md border-[1.5px] border-white border-solid p-6 "
                          : ""
                      }
                    >
                      <span className="flex relative">
                        <h3
                          className={
                            index === 0
                              ? "capitalize pb-4 font-semibold"
                              : "mt-4 mb-2 font-semibold capitalize text-sm  "
                          }
                        >
                          {" "}
                          {post.postDetails?.title}
                        </h3>
                        <span
                          className={
                            index === 0
                              ? "hidden"
                              : "inline-flex  my-4 items-center absolute right-0"
                          }
                        >
                          <img src={arrow} alt="arrow" className="h-4 " />
                        </span>
                      </span>
                      <div className="max-w-prose">
                        <p
                          className={
                            index === 0
                              ? "hidden"
                              : "line-clamp-3 text-xs mb-3 "
                          }
                        >
                          {post.postDetails?.postText}
                        </p>
                      </div>
                      <span
                        className={
                          index === 0 ? "flex justify-between items-center" : ""
                        }
                      >
                        <span
                          className={index === 0 ? "flex gap-x-8 " : "hidden"}
                        >
                          <span
                            className={
                              index === 0 ? "flex flex-col gap-y-1" : "hidden"
                            }
                          >
                            <span className="text-[10px] font-semibold">
                              Written by{" "}
                            </span>
                            <span className="text-xs font-semibold">
                              {post.author.name}
                            </span>
                          </span>
                          <span
                            className={
                              index === 0 ? "flex flex-col gap-y-1" : "hidden"
                            }
                          >
                            <span className="text-[10px] font-semibold">
                              Published on
                            </span>
                            <span className="text-xs font-semibold">
                              {post.timestamp}
                            </span>
                          </span>
                        </span>

                        <span
                          className={index === 0 ? "flex flex-col gap-y-1" : ""}
                        >
                          <span
                            className={
                              index === 0
                                ? "text-[10px] font-semibold"
                                : "hidden"
                            }
                          >
                            File under
                          </span>
                          <span
                            className={
                              index === 0 ? "flex gap-x-1" : " flex gap-x-1"
                            }
                          >
                            {post?.postDetails?.tags?.map((tag, i) => (
                              <span
                                className={
                                  index === 0
                                    ? "border border-solid border-white px-2 rounded-xl text-xs  capitalize "
                                    : "border border-solid border-black px-2 rounded-xl text-xs  capitalize"
                                }
                                key={i}
                              >
                                {tag}
                              </span>
                            ))}
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                  {/* <span className="mx-3" onClick={() => deletePost(post.id)}>
                    X
                  </span> */}
                </article>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
