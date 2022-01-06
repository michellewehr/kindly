import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_COMMENT } from "../../utils/mutations";
import { QUERY_COMMENTS } from "../../utils/queries";
import ReplyList from "../ReplyList";
import ReplyForm from "../ReplyForm";

export default function Comment({ comment, eventId, goodDeedId }) {

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

  return (
    <section className="overflow-hidden text-gray-600 body-font  shadow-md rounded mx-5 my-1">
      <div className="container px-5 mx-auto m-0">
        <div className="divide-y-2 divide-gray-100">
          <div className="flex flex-wrap py-8 md:flex-nowrap">
            <div className="flex flex-col flex-shrink-0 mb-6 md:w-64 md:mb-0">
              <span className="font-semibold text-gray-700 title-font">
                {comment.author.firstName} {comment.author.lastName}
              </span>
              {comment.createdAt && (
                <span className="mt-1 text-sm text-gray-500">
                  {comment.createdAt}
                </span>
              )};
            </div>
            <div className="md:flex-grow">
              <p className="leading-relaxed">{comment.commentText}</p>
            </div>

            <div className="group">
              <button onClick={onDelete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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

          </div>

          <div>
            {!viewReplies && comment.replies.length >= 1 && (
              <button onClick={() => { setViewReplies(true); }}>
                View Replies
              </button>
            )};

            {viewReplies && comment.replies.length >= 1 && (
              <button onClick={() => { setViewReplies(false); }} >
                Hide Replies
              </button>
            )};
          </div>

          <div>
            <button onClick={() => { setAddReply(true); }}>
              Add Reply
            </button>
          </div>
        </div>

      </div>

      <div>{addReply && <ReplyForm commentId={comment._id} />}</div>
      <div>
        {comment.replies.length >= 1 && viewReplies && (
          <ReplyList replies={comment.replies} />
        )};
      </div>
    </section>
  );
};
