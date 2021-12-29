import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
// import { QUERY_COMMENTS, QUERY_ME } from "../../utils/queries";

export default function CommentForm({eventId}) {
  const [commentText, setCommentText] = useState("");
  // const [characterCount, setCharacterCount] = useState(0);
  const [addComment] = useMutation(ADD_COMMENT);
  // const [addComment, { error }] = useMutation(ADD_COMMENT, {
  //   update(cache, { data: { addComment } }) {
  //     try {
  //       // update comment array's cache
  //       // could potentially not exist yet, so wrap in a try/catch
  //       const { comments } = cache.readQuery({ query: QUERY_COMMENTS });
  //       cache.writeQuery({
  //         query: QUERY_COMMENTS,
  //         data: { comments: [addComment, ...comments] },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }

  //     // update me object's cache
  //     const { me } = cache.readQuery({ query: QUERY_ME });
  //     cache.writeQuery({
  //       query: QUERY_ME,
  //       data: { me: { ...me, comments: [...me.comments, addComment] } },
  //     });
  //   },
  // });

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

    try {
      await addComment({
        variables: { commentText, eventId },
      });

      // clear form value
      setCommentText("");
      // setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="eventCard">
        <div className="rounded-lg mt-2 shadow-lg bg-white	 w-full flex flex-row flex-wrap p-3 antialiased">
       
          <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
            <div className="w-full text-gray-700 font-semibold relative pt-3 md:pt-0">
             <label className="p-3" for='commentText'>Leave Comment</label>
             <textarea
                    className="w-full p-3 rounded-lg shadow-lg text-sm"
                    type="text"
                    name="commentText"
                    placeholder="Great idea! I'll be there!"
                    onChange={handleChange}
                  />
              
             
              <div className="text-sm text-amber-500 pt-3 text-left">
                <button
                  type="submit"
                  className="bg-cyan-700  hover:bg-orange-300 text-white font-bold py-2 px-4 rounded mt-1"
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
