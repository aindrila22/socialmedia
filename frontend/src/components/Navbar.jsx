import { Link } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createPost } from "@/utils/api";

const Navbar = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await createPost(content);
      handleCloseModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/95 text-gray-600 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex justify-between items-center h-14 border-b border-zinc-200">
          <Link to="/" className="flex z-40 font-semibold uppercase text-xs md:text-base">
            social<span className="text-blue-500">media</span>
          </Link>
          <div className="h-full flex items-center space-x-4">
            {user !== null ? (
              <>
                <Link
                  to={`/profile/${user._id}`}
                  className={`${buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })} bg-white text-sky-900 shadow`}
                >
                  PROFILE
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                <Link
                  onClick={handleOpenModal}
                  className="px-4 py-2 bg-sky-800 rounded-md text-sm text-white uppercase"
                >
                  Create Post
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className={buttonVariants({
                    size: "sm",
                    variant: "outline",
                  })}
                >
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription>Write your post below</DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <textarea
                id="content"
                rows="4"
                value={content}
                onChange={(e) => {
                  if (e.target.value.length <= 250) {
                    setContent(e.target.value);
                  }
                }}
                maxLength="250"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter post content"
              />
              <div className="text-sm text-gray-500 mt-1">
                {content.length}/250 characters
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded-md text-sm text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleCreatePost}
                className="px-4 py-2 bg-green-500 rounded-md text-sm text-white"
              >
                Create Post
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
};
Navbar.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};
export default Navbar;
