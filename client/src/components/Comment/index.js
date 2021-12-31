import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReplyList from '../ReplyList';
import { useState } from "react";
import ReplyForm from '../ReplyForm';
import { useMutation } from "@apollo/client";
import { REMOVE_COMMENT } from "../../utils/mutations";


export default function Comment({ comment, eventId, goodDeedId }) {
  const [viewReplies, setViewReplies] = useState(false);
  const [addReply, setAddReply] = useState(false);
  const [removeComment] = useMutation(REMOVE_COMMENT);

  
  const onDelete = async (e) => {
    e.preventDefault();
    const commentId = comment._id;
    try {
      await removeComment({ variables: { commentId, eventId, goodDeedId } });
    } catch (e) {
      console.error(e);
    }
  }

  // console.log(props.comments, 'Comments props line 4 in CommentsList');

  // const state = useSelector((state) => {
  //   return state;
  // });

  // const dispatch = useDispatch();

  // const {
  //   author,
  //   commentText,
  //   createdAt,
  //   likes,
  //   replies,
  //   replyCount,
  // } = comment;

  // const {comment } = state;



  return (
    <section className="overflow-hidden text-gray-600 body-font bg-sky-300">
      <div className="container px-5 py-24 mx-auto">
        <div className="divide-y-2 divide-gray-100">
          <div className="flex flex-wrap py-8 md:flex-nowrap">
            <div className="flex flex-col flex-shrink-0 mb-6 md:w-64 md:mb-0">
              <span className="font-semibold text-gray-700 title-font">
                {/* get users name */}
                {/* {comment.author} */}
                {comment.author.firstName} {comment.author.lastName}
                {/* Author */}
                {/* this is where we would call the imported user name concat function */}
              </span>
              <span className="mt-1 text-sm text-gray-500">
                {/* get comment dateTime */}
                {/* {comment.createdAt} */}
              </span>
            </div>
            <div className="md:flex-grow">
              <p className="leading-relaxed">
                {/* get commentText */}
                {comment.commentText}
              </p>
              {/* <a className="inline-flex items-center mt-4 text-indigo-500"> */}
                {/* get likeCount */}
                {/* Likes: {comment.likes}
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg> */}
              {/* </a> */}
            </div>
            {/* delete comment button  */}
            <div className="group">
              <button onClick={onDelete}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              </button>
              <p className="invisible group-hover:block group-hover:visible">Delete Comment</p>
            </div>
          </div>
          <div>
            {!viewReplies ? <button onClick={() => { setViewReplies(true) }}>View Replies</button> : <button onClick={() => { setViewReplies(false) }}>Hide Replies</button>}
          </div>
          <div>
            <button onClick={() => { setAddReply(true) }}>Add Reply</button>
          </div>

        </div>
      </div>
      <div>
        {addReply && <ReplyForm key={comment._id} commentId={comment._id} />}
      </div>
      {/* Replies */}
      <div>
        {comment.replies.length > 1 && viewReplies &&
          <ReplyList
            key={comment._id}
            replies={comment.replies} />
        }
      </div>
    </section>
  );
}
