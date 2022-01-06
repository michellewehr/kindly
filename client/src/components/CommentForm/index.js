import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_EVENT_COMMENT,
  ADD_GOOD_DEED_COMMENT,
} from "../../utils/mutations";
import { QUERY_COMMENTS } from "../../utils/queries";

export default function CommentForm({ eventId, goodDeedId, onSubmit }) {
  const [commentText, setCommentText] = useState("");

  const [addEventComment, { error }] = useMutation(ADD_EVENT_COMMENT, {
    update(cache, { data: { addComment } }) {
      try {
        const { comments } = cache.readQuery({ query: QUERY_COMMENTS });
        cache.writeQuery({
          query: QUERY_COMMENTS,
          data: { comments: [addEventComment, ...comments] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const [addGoodDeedComment] = useMutation(ADD_GOOD_DEED_COMMENT, {
    update(cache, { data: { addComment } }) {
      try {
        const { comments } = cache.readQuery({ query: QUERY_COMMENTS });
        cache.writeQuery({
          query: QUERY_COMMENTS,
          data: { comments: [addGoodDeedComment, ...comments] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setCommentText(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (eventId) {
      try {
        await addEventComment({
          variables: { commentText, eventId },
        });
        setCommentText("");
      } catch (e) {
        console.error(e);
      }
      onSubmit();
    } else if (goodDeedId) {
      try {
        await addGoodDeedComment({
          variables: { commentText, goodDeedId },
        });
        setCommentText("");
      } catch (e) {
        console.error(e);
      }
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="eventCard">
        <div className="flex flex-row flex-wrap w-full p-3 mt-2 antialiased bg-white rounded-lg shadow-lg">
          <div className="flex flex-row flex-wrap w-full px-3 md:w-2/3">
            <div className="relative w-full pt-3 font-semibold text-gray-700 md:pt-0">
              <label className="p-3" for="commentText">
                Leave Comment
              </label>
              <textarea
                className="w-full p-3 text-sm rounded-lg shadow-lg"
                type="text"
                name="commentText"
                placeholder="Great idea! I'll be there!"
                onChange={handleChange}
              />

              <div className="pt-3 text-sm text-left">
                <button
                  type="submit"
                  className="px-4 py-2 mt-1 font-bold text-black rounded bg-sky-100 hover:bg-orange-300"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
