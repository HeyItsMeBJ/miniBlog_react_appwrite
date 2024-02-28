import React, { useEffect, useState } from "react";
import { Postcard } from "../components";
import databaseService from "../appwrite/database";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const status = useSelector((state) => state.auth.status);
  const [isactive, setisactive] = useState(status);

  useEffect(() => {
    databaseService.getPosts().then((resposts) => {
      if (resposts) {
        setPosts(resposts.documents);
        console.log(resposts.documents)
      }
    });
  }, []);
  useEffect(() => {
    setisactive(status);
  }, [status]);

  if (!isactive) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <Link to={"/login"}>
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Zero Post
            </h1>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8">
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
