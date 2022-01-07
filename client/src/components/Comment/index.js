import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_COMMENT } from "../../utils/mutations";
import { QUERY_COMMENTS } from "../../utils/queries";
import ReplyList from "../ReplyList";
import ReplyForm from "../ReplyForm";
import { isConstValueNode } from "graphql";

export default function Comment({ comment, eventId, goodDeedId, me }) {
  const [viewReplies, setViewReplies] = useState(false);
  const [addReply, setAddReply] = useState(false);

  const [removeComment, { error }] = useMutation(REMOVE_COMMENT, {
    update(cache, { data: { addComment } }) {
      try {
        const { comments } = cache.readQuery({ query: QUERY_COMMENTS });
        cache.writeQuery({
          query: QUERY_COMMENTS,
          data: { comments: [removeComment, ...comments] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const onDelete = async (e) => {
    e.preventDefault();
    const commentId = comment._id;
    try {
      await removeComment({ variables: { commentId, eventId, goodDeedId } });
    } catch (e) {
      console.error(e);
    }
  };

  console.log(me._id, 'comment')

  return (
    <section className="mx-5 my-1 overflow-hidden rounded shadow-md body-font">
      <div className="container px-5 m-0 mx-auto">
        <div className="divide-y-2 divide-gray-100">
          <div className="flex-col flex-wrap py-8 md:flex-nowrap">
            <div className="flex flex-col flex-shrink-0 mb-6 md:w-64 md:mb-0">
              <span className="text-xl font-semibold text-gray-700 border-b-2 border-orange-300 title-font">
                {comment.author.firstName} {comment.author.lastName}
                <span className="ml-2 text-sm text-gray-500">
                  - {comment.createdAt} {comment.date}
                </span>
              </span>

            </div>
            <div className="flex-col ml-3 md:flex-grow">
              <p className="py-2 leading-relaxed">{comment.commentText}</p>
            </div>
            {/* delete comment button  */}
            {comment.author._id === me._id && (
              <div className="group">
                <button onClick={onDelete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    title="Delete comment"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <p className="invisible group-hover:block group-hover:visible">
                  Delete Comment
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
