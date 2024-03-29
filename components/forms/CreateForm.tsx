import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

interface Props {
  userId: any;
}

const CreateForm = ({ userId }: Props) => {
  const createPost = useMutation(api.post.sendPost);
  const [postContent, setPostContent] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createPost({ userId: userId, body: postContent });
    setPostContent("");
  };
  return (
    <>
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-white">
            Post
          </h2>
        </div>
        <form className="mb-6 " onSubmit={(e) => handleSubmit(e)}>
          <div className="py-2 px-4 mb-4  rounded-lg rounded-t-lg border  bg-gray-800 border-gray-700">
            <label className="sr-only">Your post</label>
            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-white placeholder-gray-400 bg-gray-800"
              placeholder="Write a post..."
              value={postContent}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateForm;
