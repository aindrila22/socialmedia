import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchMyLikes, fetchUserProfile } from "@/utils/api";
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

const Profile = ({ user: currentUser }) => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [profileLikes, setProfileLikes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchUserProfile(id);
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await fetchMyLikes(id);
        setProfileLikes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [id]);

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

  if (loading) {
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

  return (
    <div className="profile">
      {profileData && (
        <>
          <Card className="max-w-4xl mx-auto mt-8">
            <CardHeader className="grid grid-cols-1 gap-6 md:gap-0 md:grid-cols-2 w-full">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {profileData.user.firstName} {profileData.user.lastName}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {profileData.user.email}
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
                  {profileData.user.firstName}&apos;s
                </span>
                &nbsp; POSTS ({profileData.posts.length})
              </TabsTrigger>
              {isCurrentUser && (
                <TabsTrigger className=" w-full" value="likes">
                  LIKED POSTS ({profileLikes.length})
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="profile">
              <MaxWidthWrapper>
                <div className="grid place-items-center w-full mx-auto mt-6">
                  {profileData.posts.length > 0 ? (
                    profileData.posts.map((post) => (
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
                    {profileLikes.length > 0 ? (
                      profileLikes.map((post) => (
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
