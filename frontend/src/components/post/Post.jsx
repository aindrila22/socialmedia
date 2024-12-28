import { useState } from "react";
//import PropTypes from "prop-types";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import PostComments from "./PostComments";
import { DeleteModal, EditModal } from "./PostModals";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
//import { likePost, deletePost, commentOnPost, updatePost } from "@/utils/api";



import { useDispatch } from "react-redux";
import {
  likePostAsync,
  deletePostAsync,
  addCommentAsync,
  updatePostAsync,
} from "../../redux/slice/postSlice";

const Post = ({ post, currentUser }) => {
  //console.log(currentUser);
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [content, setContent] = useState(post.content || "");


  const handleLike = () => {
    dispatch(likePostAsync(post._id));
  };

  const handleDelete = () => {
    dispatch(deletePostAsync(post._id));
    setIsDeleteModalOpen(false);
  };

  const handleAddComment = (comment) => {
    if (comment) {
      dispatch(addCommentAsync({ postId: post._id, comment }));
    }
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    dispatch(updatePostAsync({ postId: post._id, content }));
    setIsEditModalOpen(false);
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
          <PostComments postId={post._id} onAddComment={handleAddComment} />
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

export default Post;