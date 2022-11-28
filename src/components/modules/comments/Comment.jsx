import Image from "next/image";
import TimeAgo from "react-timeago";
import Avatar from "@/assets/images/avatar.svg";

const Comment = ({ comment_by, created_at, content }) => {
  const { first_name, last_name, suffix, doctorate_degree, image } =
    comment_by ?? {};

  const name = `${first_name} ${last_name} ${suffix ?? ""} ${
    doctorate_degree ?? ""
  }`;

  return (
    <div className="flex space-x-3">
      <div className="flex-shrink-0">
        <Image
          className="rounded-full"
          src={image?.url ?? Avatar}
          alt={name}
          width={40}
          height={40}
          objectFit="cover"
        />
      </div>
      <div>
        <div className="space-x-2 text-sm">
          <h3
            href="#"
            className="inline-block font-medium text-gray-900 capitalize"
          >
            {name}
          </h3>
          <span>&middot;</span>
          {/* <span className="font-medium text-gray-500">{props.date}</span> */}
          <TimeAgo date={created_at} />
        </div>
        <div className="mt-1 text-sm text-gray-700">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
