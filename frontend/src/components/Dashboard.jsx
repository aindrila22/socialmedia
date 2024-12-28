import { Loader2 } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useEffect} from "react";
import Post from "../components/post/Post";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/redux/slice/postSlice";

const Dashboard = ({user}) => {
  const dispatch = useDispatch();
  const { items: posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


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