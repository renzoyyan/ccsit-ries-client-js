import React from "react";
import Heading from "@/components/elements/Heading";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import useComment from "@/hooks/useComment";
import { useQuery } from "@tanstack/react-query";

const Comments = ({
  isView = false,
  data,
  children,
  research_id = null,
  extension_id = null,
}) => {
  return (
    <section aria-labelledby="notes-title">
      <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <Heading
              as="h2"
              id="notes-title"
              className="text-lg font-medium text-gray-900"
              title="Comments"
            />
          </div>
          <div className="px-4 py-6 sm:px-6">
            <ul role="list" className="space-y-8">
              {data?.map((comment) => (
                <Comment key={comment._id} {...comment} />
              ))}
            </ul>
          </div>
        </div>

        {/* {!isView && <CommentForm />} */}
        {children}
      </div>
    </section>
  );
};

export default Comments;
