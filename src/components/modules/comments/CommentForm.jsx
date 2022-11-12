import Button from "@/components/elements/Button";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

const CommentForm = () => {
  return (
    <div className="px-4 py-6 bg-gray-50 sm:px-6">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <UserCircleIcon className="w-10 h-10 text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <form action="#">
            <div>
              <label htmlFor="comment" className="sr-only">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                className="block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm outline-none focus:border-bc-primary focus:ring-bc-primary sm:text-sm"
                placeholder="Add a comment"
                defaultValue={""}
              />
            </div>
            <div className="flex items-center justify-end mt-3">
              <Button type="submit" className="px-4 py-2 text-sm btn-primary">
                Comment
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
