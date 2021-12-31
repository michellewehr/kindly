import { useState } from "react";
import { useMutation } from "@apollo/client";
import CommentForm from "../CommentForm";
import CommentsList from "../CommentsList";
import Auth from '../../utils/auth';
import {ADD_GOOD_DEED_LIKE} from '../../utils/mutations';

export default function GoodDeed({goodDeed}) {
  const [viewComments, setViewComments] = useState(false);
  const [addComment, setAddComment] = useState(false);

  const [addLike] = useMutation(ADD_GOOD_DEED_LIKE);

  const onLike = async (e) => {
    e.preventDefault();
    const goodDeedId = goodDeed._id;
    try {
      await addLike({ variables: { goodDeedId } });
    } catch (e) {
      console.error(e);
    }
  }
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
            <div className="text-normal text-cyan-900 pb-1">
              <span className="">
                {/* //! get good deed dateTime */}
                <b>Date:</b> {goodDeed.date}
              </span>
            </div>
           
            <div>
            {Auth.loggedIn() && !viewComments && goodDeed.comments.length > 1 ? <button onClick={() => {setViewComments(true)}}>View Comments</button> : Auth.loggedIn() && goodDeed.comments.length > 1 && <button onClick={() => {setViewComments(false)}}>Hide Comments</button>} 
          </div>
            <div>
            {Auth.loggedIn() && 
              <button onClick={() => {setAddComment(true)}}>Add Comment</button>}
              </div>
              {/* likes start */}
              {Auth.loggedIn() && <button className='inline-block text-sky-700 ' onClick={onLike}>
              <svg xmlns="http://www.w3.org/2000/svg" className="inline h-8 w-8 text-yellow" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg> <span className="text-cyan-800">This Good Deed has {goodDeed.likes} likes!</span>
        </button> }
        {/* likes end */}
            </div>
            <div className="text-sm text-amber-500 md:absolute pt-3 md:pt-0 bottom-0 right-0">
              <button className="bg-cyan-700  hover:bg-orange-300 text-white font-bold py-2 px-4 rounded mt-1">
                Be Kind 
                {/* //! need to add helper after signup */}
              </button>
            </div>
          </div>
       
        </div>
        {addComment && <CommentForm key={goodDeed._id} goodDeedId={goodDeed._id}/>}
      {viewComments && <CommentsList comments={goodDeed.comments} key={goodDeed._id}/>}

      </div>
  );
}
