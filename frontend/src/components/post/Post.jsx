import { useState } from "react";
import PropTypes from "prop-types";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import PostComments from "./PostComments";
import { DeleteModal, EditModal } from "./PostModals";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { likePost, deletePost, commentOnPost, updatePost } from "@/utils/api";

const Post = ({ post, currentUser }) => {
  const [showComments, setShowComments] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [content, setContent] = useState(post.content || "");
  const [comment, setComment] = useState("");

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleLike = async () => {
    try {
      await likePost(post._id);
      window.location.reload();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      handleCloseDeleteModal();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment) return;

    try {
      await commentOnPost(post._id, comment);
      setComment("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      await updatePost(content, post._id);
      setIsEditModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="mb-4 max-w-xl">
      <PostHeader author={post.author} updatedAt={post.updatedAt} />
      <CardContent>
        <p className="py-5">{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col">
        <PostActions
          post={post}
          currentUser={currentUser}
          onLike={handleLike}
          onToggleComments={() => setShowComments((prev) => !prev)}
          onEdit={() => setIsEditModalOpen(true)}
          onDelete={() => setIsDeleteModalOpen(true)}
        />
        {showComments && (
          <PostComments comments={post.comments} onAddComment={handleAddComment} />
        )}
      </CardFooter>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        content={content}
        onContentChange={(e) => setContent(e.target.value)}
        onSave={handleUpdatePost}
      />
    </Card>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Post;