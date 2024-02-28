import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { PostForm } from "../components";
import databaseService from "../appwrite/database";

function EditPost() {
  const [post, setpost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((response) => {
        if (response) setpost(response);
      });
    } else navigate("/");
  }, [slug, navigate]);


 return post ? (
    <div className=" w-screen flex justify-center items-center flex-wrap">
      <PostForm post={post} />
    </div>
  ) : navigate('/');
}

export default EditPost;
