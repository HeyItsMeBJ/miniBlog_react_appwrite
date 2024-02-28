import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

function RTE({ title, control, defaultValue, label }) {
  console.log(defaultValue);
  return (
    <>
      <div className="w-full  bg-slate-200 mb-10">
        {label && <label className=" inline-block py-3"> {label} </label>}

        <Controller
          name={title || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
            apiKey="f1zt76az1wso9vnereem8chsop1sfmya2yu34h2kv2bty7er"
            initialValue={defaultValue}
            init={{
                height: 300,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:20px }"
            }}
            onEditorChange={onChange}
            />
          )}
        />
      </div>
    </>
  );
}

export default RTE;
