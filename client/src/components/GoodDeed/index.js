import { useState } from "react";
import CommentForm from "../CommentForm";
import CommentsList from "../CommentsList";
import Auth from '../../utils/auth';

export default function GoodDeed({ goodDeed }) {
  const [viewComments, setViewComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  // only in profile
  // if (!goodDeeds.length) {
  //   return (
  //     <div>
  //       <h3>No Good Deeds yet!</h3>
  //     </div>
  //   );
  // }

  return (
    <div className="goodDeed w-full">
      <div className="rounded-lg mt-2 shadow-lg bg-white	 w-full flex flex-row flex-wrap p-3 antialiased">
        <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
          <div className="w-full text-gray-700 font-semibold relative pt-3 md:pt-0">
            <div className="flex flex-row text-2xl text-amber-500 leading-tight pb-1">
              {goodDeed.title}
            </div>
            <div className="text-sm text-amber-500 md:absolute pt-3 md:pt-0 top-0 right-0">
              {/* //!we need to be able to add this to the users total on */}
              verification Kindly Points: <b>+5</b>
            </div>
            <div className="text-normal hover:text-cyan-700 cursor-pointer text-cyan-900 pb-4">
              {/* //! get good deed host */}
              <span className="pb-1">{goodDeed.host.firstName} {goodDeed.host.lastName}</span>
            </div>
            <div className="text-normal text-cyan-900 pb-1">
              <span className="">
                {/* //! get good deed description */}
                <b>Description:</b> {goodDeed.deedText}
              </span>
            </div>
            <div className="text-normal text-cyan-900 pb-1">
              <span className="">
                {/* //! get good deed location */}
                <b>Location:</b>{goodDeed.location}
              </span>
            </div>
            {/* <div className="text-normal text-cyan-900 pb-1">
              <span className="">
                <b>Created At:</b> {goodDeed.createdAt}
              </span>
            </div> */}

            <div>
              {Auth.loggedIn() && !viewComments ? <button onClick={() => { setViewComments(true) }}>View Comments</button> : <button onClick={() => { setViewComments(false) }}>Hide Comments</button>}
            </div>
            <div>
              {Auth.loggedIn() &&
                <button onClick={() => { setAddComment(true) }}>Add Comment</button>}
            </div>
          </div>
          <div className="text-sm text-amber-500 md:absolute pt-3 md:pt-0 bottom-0 right-0">
            <button className="bg-cyan-700  hover:bg-orange-300 text-white font-bold py-2 px-4 rounded mt-1">
              Be Kind
              {/* //! need to add helper after signup */}
            </button>
          </div>
        </div>
      </div>
      {addComment && <CommentForm key={goodDeed._id} goodDeedId={goodDeed._id} />}
      {viewComments && <CommentsList comments={goodDeed.comments} key={goodDeed._id} />}

    </div>
  );
}
