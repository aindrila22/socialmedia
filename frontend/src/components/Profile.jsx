import {useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Post from "./post/Post";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "./ui/button";
import {useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/redux/slice/postSlice";
import { fetchUserProfile } from "../utils/api";


const Profile = ({ user: currentUser }) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [author, setAuthor] = useState(null);
  const [loadingAuthor, setLoadingAuthor] = useState(true);

  const { items: posts, loading, error } = useSelector((state) => state.posts);

    useEffect(() => {
      dispatch(fetchPosts());
    }, [dispatch]);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetchAuthorIfNeeded = async () => {
      try {
        const filteredPosts = posts.filter((post) => post.author._id === id);
        const filteredLikes = posts.filter((post) => post.likes.includes(id));

        if (filteredPosts.length > 0) {
          setAuthor(filteredPosts[0].author);
        } else if (filteredLikes.length > 0) {
          setAuthor(filteredLikes[0].author);
        } else {
          const data = await fetchUserProfile(id); 
        setAuthor(data.user);
        }
      } catch (err) {
        console.log(err.response?.data?.message || "Failed to fetch author");
      } finally {
        setLoadingAuthor(false);
      }
    };

    fetchAuthorIfNeeded();
  }, [id, posts]);


  if (loadingAuthor || loading || !currentUser) {
    return (
      <MaxWidthWrapper>
        <div className="min-h-screen flex justify-center items-center w-full mx-auto">
          <Loader2 className="animate-spin h-10 w-10 text-zinc-500 mb-2" />
        </div>
      </MaxWidthWrapper>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const isCurrentUser = id === currentUser._id;
  const filteredPosts = posts.filter((post) => post.author._id === id);
  const filteredLikes = posts.filter((post) => post.likes.includes(id));


  return (
    <div className="profile">
      {filteredPosts && (
        <>
          <Card className="max-w-4xl mx-auto mt-8">
            <CardHeader className="grid grid-cols-1 gap-6 md:gap-0 md:grid-cols-2 w-full">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {author
                    ? `${author.firstName} ${author.lastName}`
                    : "No Author Found"}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {author?.email || "No email available"}
                </CardDescription>
              </div>
              <div className="flex justify-end items-center">
                {isCurrentUser && (
                  <>
                    <Link
                      to="/"
                      className="ml-4 px-4 py-2 bg-gray-900 text-white rounded uppercase text-xs"
                    >
                      Back
                    </Link>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger>
                        <div
                          onClick={openDialog}
                          className="ml-4 px-4 py-2 bg-gray-200 text-black rounded uppercase text-xs"
                        >
                          Logout
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Confirm Logout</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to log out?
                        </DialogDescription>
                        <div className="flex justify-end space-x-2">
                          <Button
                            onClick={closeDialog}
                            className="px-4 py-2 bg-gray-200 text-sm"
                            variant="ghost"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-gray-900 text-sm text-white"
                          >
                            Logout
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
                {!isCurrentUser && (
                  <Link
                    to="/"
                    className="ml-4 px-4 py-2 bg-gray-200 text-black rounded uppercase text-xs"
                  >
                    Back
                  </Link>
                )}
              </div>
            </CardHeader>
          </Card>
          <Tabs
            className="mt-6 max-w-4xl w-full grid place-items-center mx-auto"
            defaultValue="profile"
          >
            <TabsList className="flex w-full">
              <TabsTrigger className="w-full uppercase" value="profile">
                <span className="text-blue-500">
                  {author?.firstName || "User"}&apos;s
                </span>
                &nbsp; POSTS ({filteredPosts.length})
              </TabsTrigger>
              {isCurrentUser && (
                <TabsTrigger className=" w-full" value="likes">
                  LIKED POSTS ({filteredLikes.length})
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="profile">
              <MaxWidthWrapper>
                <div className="grid place-items-center w-full mx-auto mt-6">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <Post
                        key={post._id}
                        post={post}
                        currentUser={currentUser}
                      />
                    ))
                  ) : (
                    <div className="pt-16 flex justify-center items-center w-full mx-auto">
                      No posts yet.
                    </div>
                  )}
                </div>
              </MaxWidthWrapper>
            </TabsContent>

            {isCurrentUser && (
              <TabsContent value="likes">
                <MaxWidthWrapper>
                  <div className="grid place-items-center w-full mx-auto mt-6">
                    {filteredLikes.length > 0 ? (
                      filteredLikes.map((post) => (
                        <Post
                          key={post._id}
                          post={post}
                          currentUser={currentUser}
                        />
                      ))
                    ) : (
                      <div className="pt-16 flex justify-center items-center w-full mx-auto">
                        No liked post yet.
                      </div>
                    )}
                  </div>
                </MaxWidthWrapper>
              </TabsContent>
            )}
          </Tabs>
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    likes: PropTypes.array, // Optional likes array
  }).isRequired,
};

export default Profile;
