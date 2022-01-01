import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import { QUERY_COMMENTS, QUERY_ME } from "../../utils/queries";

// import { QUERY_COMMENTS, QUERY_ME } from "../../utils/queries";

export default function CommentForm({ eventId, goodDeedId, onSubmit }) {
  const [commentText, setCommentText] = useState("");
  const [addComment, { error }] = useMutation(ADD_COMMENT, {

    update(cache, { data: { addComment } }) {
      try {
        const { comments } = cache.readQuery({ query: QUERY_COMMENTS });
        cache.writeQuery({
          query: QUERY_COMMENTS,
          data: { comments: [addComment, ...comments] },
        });
      } catch (e) {
        console.error(e);
      }

      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, comments: [addComment, ...me.comments, addComment] } },
      });
    },
  });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setCommentText(event.target.value);
      // setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(commentText, 'comment text');
    try {
      await addComment({
        variables: { commentText, eventId, goodDeedId },
      });

      // clear form value
      setCommentText("");
      // setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="eventCard">
        <div className="flex flex-row flex-wrap w-full p-3 mt-2 antialiased bg-white rounded-lg shadow-lg">

          <div className="flex flex-row flex-wrap w-full px-3 md:w-2/3">
            <div className="relative w-full pt-3 font-semibold text-gray-700 md:pt-0">
              <label className="p-3" for='commentText'>Leave Comment</label>
              <textarea
                className="w-full p-3 text-sm rounded-lg shadow-lg"
                type="text"
                name="commentText"
                placeholder="Great idea! I'll be there!"
                onChange={handleChange}
              />


              <div className="pt-3 text-sm text-left text-amber-500">
                <button
                  type="submit"
                  className="px-4 py-2 mt-1 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300"
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
