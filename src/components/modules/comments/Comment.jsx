import React from "react";

const Comment = (props) => {
  return (
    <li key={props.id}>
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            className="w-10 h-10 rounded-full"
            src={`https://images.unsplash.com/photo-${props.imageId}?i2xlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
            alt=""
          />
        </div>
        <div>
          <div className="space-x-2 text-sm">
            <a href="#" className="font-medium text-gray-900">
              {props.name}
            </a>
            <span>&middot;</span>
            <span className="font-medium text-gray-500">{props.date}</span>
          </div>
          <div className="mt-1 text-sm text-gray-700">
            <p>{props.body}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Comment;
