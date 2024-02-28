import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/database";
import { useSelector } from "react-redux";
import { Postcard } from "../components";
function AllPost() {
  const [posts, setposts] = useState([]);
  const userdata =  useSelector((state) => state.auth.userData);
  
  const [userData, setuserData] = useState(userdata)

  useEffect(() => {
    // console.log("useeffect woeking,.....")
    setuserData(userdata)
    databaseService.getPosts(userData.$id).then((allpost) => {
      if (allpost) setposts(allpost.documents);
      console.log(allpost);
    });
  }, [userdata]);

  return (
    <div className="w-screen  flex flex-wrap gap-4">
      {posts.map((post) => (
        <div className="w-1/5 h-44 p-2" key={post.title}>
          <Postcard
            title={post.title}
            $id={post.$id}
            featuredImage={post.featuredImage}
          />
        </div>
      ))}
    </div>
  );
}

export default AllPost;
