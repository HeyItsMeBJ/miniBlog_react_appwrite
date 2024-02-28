import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import databaseService from "../appwrite/database";
import storageService from "../appwrite/storage";

export default function Post() {
  const [post, setPost] = useState(null);
  const [url, seturl] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();
  // console.log(slug);
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((respost) => {
        if (respost) {
          setPost(respost);
          storageService
            .previewFile(respost.featuredImage)
            .then((res) => seturl(res.href));
        } else navigate("/");
        // console.log(respost);
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <div className="">
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img src={url} alt={post.title} className="rounded-xl" />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </div>
    </div>
  ) : null;
}
