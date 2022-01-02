// import { createSourceEventStream } from "graphql"
import CommentForm from "../CommentForm";
import { Link } from "react-router-dom";
import CommentsList from "../CommentsList";
import { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import {
  CANCEL_EVENT,
  JOIN_EVENT,
  LEAVE_EVENT,
  ADD_EVENT_LIKE,
  ADD_VERIFICATION,
  INCREASE_KINDLY_SCORE,
} from "../../utils/mutations";
// import { QUERY_ME } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { checkLikesCount } from "../../utils/likesCountFormatter";

export default function EventCard({ event, me }) {
  const [viewComments, setViewComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [joinEvent] = useMutation(JOIN_EVENT);
  const [leaveEvent] = useMutation(LEAVE_EVENT);
  const [cancelEvent] = useMutation(CANCEL_EVENT);
  const [isLiked, setLiked] = useState(false);
  // const [count, setCount] = useState(0);
  const [increaseScore] = useMutation(INCREASE_KINDLY_SCORE);
  const [addVerification, { loading, error }] = useMutation(ADD_VERIFICATION);
  const [addLike] = useMutation(ADD_EVENT_LIKE);

  //declare state of event false verified and run updateVerify to update to true when conditions are met
  // const [isVerified, updateVerify] = useState(false);
  console.log(`/event/${event._id}`, "eventId");
  const hostId = event.host._id;
  const attendees = event.attendees;

  //if event is verified over half the length of attendees-- set isVerified to true
  // if(event.verifyNumber >= attendees.length /2) {
  //   updateVerify(true);
  // }

  //when event is verified-- add points to all attendees/ host kindly score
  // useEffect(() => {
  //   addKindlyPoints()
  // }, [isVerified])

  async function addKindlyPoints() {
    try {
      await increaseScore();
    } catch (e) {
      console.error(e);
    }
  }
  //

  // check if date of event is behind the current date and return boolean
  const eventPassed = () => {
    return Date.now() > event.date;
  };
  // check if more than half of attendees have verified event
  const isHalfOfAttendees = () => {
    return event.verifyNumber < attendees.length / 2;
  };

  const onVerify = async (e) => {
    e.preventDefault();
    const eventId = event._id;
    try {
      await addVerification({ variables: { eventId } });
    } catch (e) {
      console.error(e);
    }
  };

  const onLike = async (e) => {
    e.preventDefault();
    const eventId = event._id;
    try {
      await addLike({ variables: { eventId } });
    } catch (e) {
      console.error(e);
    }
    setLiked(true);
  };

  const onJoin = async (e) => {
    e.preventDefault();
    try {
      const eventId = event._id;
      await joinEvent({ variables: { eventId } });
    } catch (e) {
      console.error(e);
    }
    addKindlyPoints();
  };

  const onLeave = async (e) => {
    const eventId = event._id;
    try {
      await leaveEvent({ variables: { eventId } });
    } catch (e) {
      console.error(e);
    }
  };

  const onCancel = async (e) => {
    const eventId = event._id;
    try {
      await cancelEvent({ variables: { eventId } });
    } catch (e) {
      console.error(e);
    }
    // window.location.reload(false);
  };

  const checkAttendance = () => {
    // check if current user is host
    if (hostId === me._id) {
      return (
        <div>
          <button
            onClick={onCancel}
            className="px-4 py-2 mx-3 mt-1 mr-3 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300"
          >
            Cancel Event
          </button>
          {/* if verify number in db more than half attendees, event verified */}
          {isHalfOfAttendees() && eventPassed() && (
            <button
              onClick={onVerify}
              className="px-4 py-2 mt-1 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300"
            >
              Verify Event
            </button>
          )}
        </div>
      );
    }

    // check if user is attendee
    for (let i = 0; i < attendees.length; i++) {
      if (attendees[i]._id === me._id) {
        // console.log('match!');
        return (
          <div>
            <button
              className="pr-3"
              onClick={onLeave}
              className="px-4 py-2 mx-3 mt-1 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300"
            >
              Leave Event
            </button>
            {isHalfOfAttendees && eventPassed && (
              <button
                onClick={onVerify}
                className="px-4 py-2 mt-1 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300"
              >
                Verify Event
              </button>
            )}
          </div>
        );
      }
    }
    return (
      <div>
        <button
          className="pr-3"
          onClick={onJoin}
          className="px-4 py-2 mx-3 mt-1 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300"
        >
          Be Kind & Attend Event
        </button>
      </div>
    );
  };

  // if (!events.length) {
  //   return (
  //     <div>
  //       <h3>No events yet!</h3>
  //     </div>
  //   )
  // }

  return (
    <div className="eventCard">
      <div className="flex flex-row flex-wrap w-full p-3 mt-2 antialiased bg-white rounded-lg shadow-lg">
        <div className="w-full md:w-1/3">
          <img
            className="antialiased rounded-lg shadow-lg xl"
            src={event.image}
            alt="Alt tag"
          />
          {Auth.loggedIn() && !isLiked ? (
            <button className="inline-block text-sky-700 " onClick={onLike}>
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
            Auth.loggedIn() && (
              <span className="inline-block text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-8 h-8 text-yellow"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              </span>
            )
          )}
          {Auth.loggedIn() && (
            <span className="text-cyan-800">
              {checkLikesCount(event.likes, "event")}
            </span>
          )}
        </div>
        <div className="flex flex-row flex-wrap w-full px-3 md:w-2/3">
          <div className="relative w-full pt-3 font-semibold text-left text-gray-700 md:pt-0">
            <div className="flex flex-row pb-1 text-2xl leading-tight text-amber-500">
              <Link to={`/event/${event._id}`}>{event.title}</Link>
              {/* verified check start */}
              {attendees.length > 1 &&
                event.verifyNumber >= attendees.length / 2 && (
                  <div className="inline-block group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block w-5 h-5 mx-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="invisible inline-block text-sm group-hover:visible">
                      Event Verified
                    </p>
                  </div>
                )}
              {/* verified check end */}
            </div>
            <div className="top-0 right-0 pt-3 text-sm text-amber-500 md:absolute md:pt-0">
              Kindly Points: <b>+10</b>
            </div>
            <div className="pb-4 cursor-pointer text-normal hover:text-cyan-700 text-cyan-900">
              <Link to={`/profile/${event.host._id}`}>
                {event.host.firstName} {event.host.lastName}
              </Link>{" "}
            </div>

            <div className="pb-1 text-normal text-cyan-900">
              <span className="">
                <b>Description:</b> {event.description}
              </span>
            </div>
            <div className="pb-1 text-normal text-cyan-900">
              <span className="">
                <b>Location:</b>
                {event.location}
              </span>
            </div>
            <div className="pb-1 text-normal text-cyan-900">
              <span className="">
                <b>Date:</b> {event.date}
              </span>
            </div>
            <div className="pb-1 text-normal text-cyan-900">
              <span className="">
                <b>Time:</b> {event.startTime + " - " + event.endTime}
              </span>
            </div>
            <div className="pb-1 text-normal text-cyan-900 hover:text-orange-300">
              <a href={event.url}>
                <span className="">
                  <i>Event Website</i>
                </span>
              </a>
            </div>
            {/* button div for viewing comments/ hiding comments */}
            <div>
              {Auth.loggedIn() &&
              !viewComments &&
              event.comments.length >= 1 ? (
                <button
                  onClick={() => {
                    setViewComments(true);
                  }}
                >
                  View Comments
                </button>
              ) : (
                Auth.loggedIn() &&
                event.comments.length >= 1 && (
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
            {/* button div to add comment */}
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
            {/* hover to see attendees list */}
            <div className="relative flex flex-col group w-max">
              <span className="cursor-pointer">
                View {attendees.length} Attendees
              </span>
              <ul className="top-0 z-10 flex-col justify-center hidden text-sm text-black bg-orange-300 rounded attendee-list group-hover:block w-max">
                {attendees.map((attendee, index) => (
                  <li key={attendee._id} className="py-1 pl-4 pr-1">
                    <Link
                      to={`/profile/${attendee._id}`}
                      style={{ fontWeight: 700 }}
                    >
                      {index + 1}. {attendee.firstName} {attendee.lastName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* button depending on attendence to join/leave/cancel event*/}
            <div className="bottom-0 right-0 pt-3 text-sm text-amber-500 md:absolute md:pt-0">
              {Auth.loggedIn() && <div>{checkAttendance()}</div>}
            </div>
          </div>
        </div>
      </div>
      {addComment && (
        <CommentForm
          onSubmit={() => setViewComments(true)}
          eventId={event._id}
        />
      )}
      {viewComments && (
        <CommentsList comments={event.comments} eventId={event._id} />
      )}
    </div>
  );
}
