import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REPLY } from "../../utils/mutations";

export default function ReplyForm({commentId}) {
  const [replyBody, setReplyBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addReply] = useMutation(ADD_REPLY);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setReplyBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(replyBody, 'reply body')
    console.log(commentId);
    try {
      // ! add reply to database
      await addReply({
        variables: { replyBody, commentId}
      });

      // clear form value
      setReplyBody("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
      // className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {/* {error && <span className="ml-2">Something went wrong...</span>} */}
      </p>
      <form
        className=""
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="reply to this comment..."
          value={replyBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
