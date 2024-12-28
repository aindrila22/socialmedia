import PropTypes from "prop-types";
import { Avatar, AvatarFallback } from "../ui/avatar";
import moment from "moment";
import { CardHeader } from "../ui/card";
import { Link } from "react-router-dom";

const PostHeader = ({ author, updatedAt }) => {
  //console.log(author)
  const getInitials = (name) => {
    const names = name?.split(" ") || [];
    const firstInitial = names[0]?.[0] || "";
    const lastInitial = names[1]?.[0] || "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return (
    <CardHeader className="grid grid-cols-12 bg-sky-50 w-full rounded-xl">
      <Link to={`/profile/${author?._id}`} className="col-span-1">
        <Avatar className={`h-12 w-12  flex-shrink-0 col-span-1`}>
          <AvatarFallback className={`bg-sky-900 text-white`}>
            {getInitials(`${author?.firstName} ${author?.lastName}`)}
          </AvatarFallback>
        </Avatar>
      </Link>
      <div className=" col-span-11 lg:ml-5 ml-10">
        <Link
          to={`/profile/${author?._id}`}
          className="text-gray-700 font-semibold text-base hover:underline "
        >
          {author?.firstName} {author?.lastName}
        </Link>
        <div className="text-gray-400 text-xs ">
          posted on
          <span> {moment(updatedAt).format("MMMM Do YYYY, h:mm A")}</span>
        </div>
      </div>
    </CardHeader>
  );
};

PostHeader.propTypes = {
  author: PropTypes.object,
  updatedAt: PropTypes.string,
};

export default PostHeader;
