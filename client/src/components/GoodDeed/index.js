import { useState } from "react";
import { useMutation } from "@apollo/client";
import CommentForm from "../CommentForm";
import CommentsList from "../CommentsList";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import {
  ADD_GOOD_DEED_LIKE,
  CANCEL_GOOD_DEED,
  JOIN_GOOD_DEED,
  LEAVE_GOOD_DEED,
  INCREASE_KINDLY_SCORE,
} from "../../utils/mutations";
import { checkLikesCount } from "../../utils/likesCountFormatter";
import { QUERY_ME, QUERY_GOOD_DEEDS } from "../../utils/queries";

export default function GoodDeed({ goodDeedData, me }) {
  const [viewComments, setViewComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [addLike] = useMutation(ADD_GOOD_DEED_LIKE);
  const [joinGoodDeed] = useMutation(JOIN_GOOD_DEED, {
    update(cache, { data: { joinGoodDeed } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, goodDeeds: [...me.goodDeeds, joinGoodDeed] } },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });
  const [leaveGoodDeed] = useMutation(LEAVE_GOOD_DEED, {
    update(cache, { data: { leaveGoodDeed } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          //remove good deed from user
          data: {
            me: {
              ...me,
              goodDeeds: me.goodDeeds.filter(
                (goodDeed) => goodDeed._id !== leaveGoodDeed._id
              ),
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  const [cancelGoodDeed] = useMutation(CANCEL_GOOD_DEED, {
    update(cache, { data: { cancelGoodDeed } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: {
              ...me,
              goodDeeds: me.goodDeeds.filter(
                (goodDeed) => goodDeed._id !== cancelGoodDeed._id
              ),
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
      const { goodDeeds } = cache.readQuery({ query: QUERY_GOOD_DEEDS });
      console.log(goodDeeds, "good deeds query");
      cache.writeQuery({
        query: QUERY_GOOD_DEEDS,
        data: {
          goodDeeds: {
            ...goodDeeds,
            goodDeeds: goodDeeds.filter(
              (goodDeed) => goodDeed._id !== cancelGoodDeed._id
            ),
          },
        },
      });
    },
  });

  const [isLiked, setLiked] = useState(false);
  const [increaseScore] = useMutation(INCREASE_KINDLY_SCORE);

  const goodDeed = goodDeedData || {};

  const hostId = goodDeed.host._id;
  const myId = me._id;
  const helper = goodDeed.helper;

  async function addKindlyPoints() {
    try {
      await increaseScore();
    } catch (e) {
      console.error(e);
    }
  }

  const onJoin = async (e) => {
    e.preventDefault();
    try {
      const goodDeedId = goodDeed._id;
      await joinGoodDeed({ variables: { goodDeedId } });
    } catch (e) {
      console.error(e);
    }
    addKindlyPoints();
  };

  const onLeave = async (e) => {
    const goodDeedId = goodDeed._id;
    try {
      await leaveGoodDeed({ variables: { goodDeedId } });
    } catch (e) {
      console.error(e);
    }
    checkAttendance();
  };

  const onCancel = async (e) => {
    const goodDeedId = goodDeed._id;
    try {
      await cancelGoodDeed({ variables: { goodDeedId } });
    } catch (e) {
      console.error(e);
    }
    checkAttendance();
  };

  const checkAttendance = () => {
    // check if current user is host
    if (hostId === myId) {
      return (
        <div>
          <button
            onClick={onCancel}
            className="bottom-0 right-0 px-4 py-2 mx-3 mt-1 text-sm font-bold text-black rounded lg:absolute bg-sky-100 hover:bg-orange-300"
          >
            Cancel Good Deed
          </button>
        </div>
      );
    }

    if (helper) {
      const helperId = helper._id;
      const helperFirstName = helper.firstName;
      const helperLastName = helper.lastName;

      // if user is helper
      if (helperId === myId) {
        return (
          <div>
            <button
              className="pr-3"
              onClick={onLeave}
              className="bottom-0 right-0 px-4 py-2 mx-3 mt-1 text-sm font-bold text-black rounded md:absolute bg-sky-100 hover:bg-orange-300"
            >
              Leave Good Deed
            </button>
          </div>
        );
      }

      return (
        <div>
          <h4
            className="pr-3"
            className="bottom-0 right-0 px-4 py-2 mx-3 mt-1 text-sm font-bold text-black bg-orange-100 rounded md:absolute"
          >
            {helperFirstName} {helperLastName} is already helping!
          </h4>
        </div>
      );
    }

    return (
      <button
        className="pr-3"
        onClick={onJoin}
        className="bottom-0 right-0 px-4 py-2 mx-3 mt-1 text-sm font-bold text-black rounded md:absolute bg-sky-100 hover:bg-orange-300"
      >
        Be Kind & Help {goodDeed.host.firstName} {goodDeed.host.lastName}
      </button>
    );
  };

  const onLike = async (e) => {
    e.preventDefault();
    const goodDeedId = goodDeed._id;
    try {
      await addLike({ variables: { goodDeedId } });
    } catch (e) {
      console.error(e);
    }
    setLiked(true);
  };

  // only in profile
  // if (!goodDeeds.length) {
  //   return (
  //     <div>
  //       <h3>No Good Deeds yet!</h3>
  //     </div>
  //   );
  // }

  return (
    <div className="w-2/3 mx-auto goodDeed">
      <div className="flex flex-row flex-wrap w-full p-3 mt-2 antialiased bg-white rounded-lg shadow-lg">
        <div className="relative flex flex-row flex-wrap w-full px-3">
          <div className="relative w-full pt-3 font-semibold text-gray-700 md:pt-0">
            <div className="flex flex-row pb-1 text-2xl leading-tight text-amber-500">
              <Link to={`/gooddeed/${goodDeed._id}`}>{goodDeed.title}</Link>
            </div>
            <div className="top-0 right-0 pt-3 text-sm text-amber-500 md:absolute md:pt-0">
              {/* //!we need to be able to add this to the users total on */}
              Kindly Points: <b>+10</b>
            </div>
            {/* wanted to be dynamic and "+10 points then change it when those points are added to "you earned 10 for this deed' */}
            {/* {showPotentialPoints ?  <div className="top-0 right-0 pt-3 text-sm text-amber-500 md:absolute md:pt-0">
              {/* //!we need to be able to add this to the users total on */}
            {/* Kindly Points: <b>+10</b> */}
            {/* </div> :<div className="top-0 right-0 pt-3 text-sm text-amber-500 md:absolute md:pt-0"> */}
            {/* //!we need to be able to add this to the users total on */}
            {/* You earned <b>10</b> Kindly Points by being kind! <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"> */}
            {/* <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" /> */}
            {/* </svg> */}
            {/* </div>  }  */}
            {/* end of wanting dynamic potential points */}
            <div className="pb-4 text-black cursor-pointer text-normal hover:text-cyan-700">
              <Link to={`/profile/${goodDeed.host._id}`}>
                {goodDeed.host.firstName} {goodDeed.host.lastName}
              </Link>
            </div>
            <div className="pb-1 text-black text-normal">
              <span className="">
                {/* //! get good deed location */}
                {goodDeed.date} in {goodDeed.location}
              </span>
            </div>
            <div className="pb-1 text-black text-normal">
              <span className="">
                {/* //! get good deed description */}
                {goodDeed.deedText}
              </span>
            </div>

            <div>
              {Auth.loggedIn() &&
              !viewComments &&
              goodDeed.comments.length >= 1 ? (
                <button
                  onClick={() => {
                    setViewComments(true);
                  }}
                >
                  View Comments
                </button>
              ) : (
                Auth.loggedIn() &&
                goodDeed.comments.length >= 1 && (
                  <button
                    onClick={() => {
                      setViewComments(false);
                    }}
                  >
                    Hide Comments
                  </button>
                )
              )}
            </div>

            <div>
              {Auth.loggedIn() && (
                <button
                  onClick={() => {
                    setAddComment(true);
                  }}
                >
                  Add Comment
                </button>
              )}
            </div>

            {/* likes start */}
            {Auth.loggedIn() && !isLiked ? (
              <button className="inline-block text-slate-400 " onClick={onLike}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline w-8 h-8 text-yellow"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              </button>
            ) : (
              <span className="inline-block text-orange-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-8 h-8 text-yellow"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              </span>
            )}
            {Auth.loggedIn() && (
              <span className="text-slate-600">
                {checkLikesCount(goodDeed.likes, "good deed")}
              </span>
            )}
            {/* likes end */}
            {/* be kind button */}
            {/* <div className="bottom-0 right-0 pt-3 text-sm text-amber-500 md:absolute md:pt-0">
              <button className="px-4 py-2 mt-1 font-bold text-black rounded bg-sky-100 hover:bg-orange-300">
                Be Kind
                {/* //! need to add helper after signup */}
            {/* </button> */}
            {/* </div> */}
            {/* end of be kind button */}
          </div>
          {Auth.loggedIn() && <div>{checkAttendance()}</div>}
        </div>
      </div>
      {addComment && (
        <CommentForm
          goodDeedId={goodDeed._id}
          onSubmit={() => setViewComments(true)}
        />
      )}
      {viewComments && (
        <CommentsList
          comments={goodDeed.comments}
          goodDeedId={goodDeed._id}
          me={me}
        />
      )}
    </div>
  );
}
