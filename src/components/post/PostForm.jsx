import React, { useCallback, useEffect } from "react";
import { Button, Input, Select, RTE } from "../index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import storageService from "../../appwrite/storage";
import databaseService from "../../appwrite/database";
function PostForm({ post }) {
  const [url, seturl] = React.useState("");

  const { setValue, getValues, register, handleSubmit, watch, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        status: post?.status || "active",
        slug: post?.$id || "",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const submit = async (data) => {
    // for update post
    if (post) {
      //uploading the new image
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;
      //if img uploaded we get file.$id as featured image then delete past post's img
      if (file) storageService.deleteFile(post.featuredImage);
      //update post by new input form data and new uploaded img id
      const updatedPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file?.$id || post.featuredImage,
      });
      if (updatedPost) navigate(`/post/${updatedPost.$id}`);
    }
    // new post
    else {
      //uploading the image
      const file = await storageService.uploadFile(data.image[0]);
      // console.log("1pass", data,typeof(data.image[0]) );
      console.log("1pass", file, userData);
      if (file) {
        const post = await databaseService.createPost(data.slug, {
          title: data.title,
          featuredImage: file.$id,
          userId: userData.$id,
          status: data.status,
          content: data.content,
        });
        // console.log("2pass",post);

        if (post) navigate(`/post/${post.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      const newslug = value
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, ")")
        .replace(/\s/g, "-");
      //   setValue("slug", newslug);
      return newslug;
    }
    return "";
  }, []);

  useEffect(() => {
    post
      ? storageService
          .previewFile(post.featuredImage)
          .then((res) => seturl(res.href))
      : "";
    const subscribe = watch((value, { name }) => {
      if (name === "title")
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
    });
    return () => {
      return subscribe.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        {!post && (
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
        )}
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img src={url} alt={post.title} className="rounded-lg" />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
