import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PostComments = ({ comments, onAddComment }) => {
  const [comment, setComment] = useState("");
console.log(comments)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  return (
    <div className="w-full">
      <h4 className="font-bold mb-2">Comments:</h4>
      {comments.map((comment, index) => (
        <div
          key={index}
          className="flex justify-between items-center mb-2 border-b p-1"
        >
          <span>
            <small className="font-semibold">{comment.user.email}</small>:{" "}
            <small>{comment.content}</small>
          </span>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="mt-2 md:flex block ">
        <Input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mr-2 mb-4 md:mb-4"
        />
        <Button type="submit">Comment</Button>
      </form>
    </div>
  );
};

PostComments.propTypes = {
  comments: PropTypes.array.isRequired,
  onAddComment: PropTypes.func.isRequired,
};

export default PostComments;