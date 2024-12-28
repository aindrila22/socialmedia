import { Loader2 } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useEffect, useState } from "react";
import { fetchAllPosts } from "@/utils/api";
import Post from "../components/post/Post";
import PropTypes from "prop-types";

const Dashboard = ({user}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const getPosts = async () => {
        try {
          const fetchedPosts = await fetchAllPosts();
          setPosts(fetchedPosts);
        } catch (err) {
          setError(err);
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
  
      getPosts();
    }, [error]);

    if (loading)
      return (
        <MaxWidthWrapper>
          <div className="min-h-screen flex justify-center items-center w-full mx-auto">
            <Loader2 className="animate-spin h-6 w-6 lg:h-10 lg:w-10 text-zinc-500 mb-2" />
          </div>
        </MaxWidthWrapper>
      );
  
    return (
      <MaxWidthWrapper>
        <div className="grid place-items-center w-full mx-auto mt-6">
        {posts.map((post) => (
         <Post key={post._id} post={post} currentUser={user} />
        ))}
        </div>
      </MaxWidthWrapper>
    );
}
Dashboard.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};
  
export default Dashboard