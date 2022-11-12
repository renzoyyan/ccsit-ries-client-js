import React from "react";
import Heading from "@/components/elements/Heading";
import CommentForm from "./comments/CommentForm";
import Comment from "./comments/Comment";

const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "4d ago",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "4d ago",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

const Comments = ({ isView = false }) => {
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
              {comments.map((comment) => (
                <Comment key={comment.id} {...comment} />
              ))}
            </ul>
          </div>
        </div>

        {!isView && <CommentForm />}
      </div>
    </section>
  );
};

export default Comments;
