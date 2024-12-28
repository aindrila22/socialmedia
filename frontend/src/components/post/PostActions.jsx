import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";

const PostActions = ({
  post,
  currentUser,
  onLike,
  onToggleComments,
  onEdit,
  onDelete,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 w-full">
    <Button onClick={onLike} variant="outline" className="w-full">
      {post.likes.length > 1 ? "Likes ❤️" : "Like"} ({post.likes.length})
    </Button>
    <Button
      onClick={onToggleComments}
      variant="outline"
      className="w-full"
    >
      Comments ({post.comments.length})
    </Button>
    {currentUser && currentUser._id === post.author._id && (
      <>
        <Button onClick={onEdit} variant="secondary" className="w-full">
          Edit
        </Button>
        <Button onClick={onDelete} variant="destructive" className="w-full">
          Delete
        </Button>
      </>
    )}
  </div>
);

PostActions.propTypes = {
  post: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onToggleComments: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostActions;