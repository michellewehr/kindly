// import { createSourceEventStream } from "graphql"
import CommentForm from "../CommentForm";
import CommentsList from "../CommentsList";
import { useState } from "react";
import Auth from '../../utils/auth';
import { JOIN_EVENT, LEAVE_EVENT } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

export default function EventCard({event}) {
  const eventId = event._id
  const [viewComments, setViewComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  // const [toggleAttendBtn, setToggleAttendBtn] = useState(true)
  const [joinEvent] = useMutation(JOIN_EVENT);
  const [leaveEvent] = useMutation(LEAVE_EVENT);


  const onJoin = async e => {
    e.preventDefault();
    try {
      const eventId = event._id;
      const { data } = await joinEvent({ variables: {eventId} });
      console.log(data, 'data');
    } catch (e) {
      console.error(e);
    }
  //  setToggleAttendBtn(false);
  }

// async function onLeave(eventId) {
//   try {
//     return await leaveEvent({ variables: eventId });
//   } catch (e) {
//     console.error(e);
//   }
// }

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
            className="antialiased rounded-lg shadow-lg"
            src={event.image}
            alt="Alt tag"
          />
        </div>
        <div className="flex flex-row flex-wrap w-full px-3 md:w-2/3">
          <div className="relative w-full pt-3 font-semibold text-left text-gray-700 md:pt-0">
            <div className="flex flex-row pb-1 text-2xl leading-tight text-amber-500">
              {event.title}
            </div>
            <div className="top-0 right-0 pt-3 text-sm text-amber-500 md:absolute md:pt-0">
              Kindly Points: <b>+10</b>
            </div>
            <div className="pb-4 cursor-pointer text-normal hover:text-cyan-700 text-cyan-900">
              <span className="pb-1">{event.host.firstName} {event.host.lastName}</span>
            </div>
            <div className="pb-1 text-normal text-cyan-900">
              <span className="">
                <b>Description:</b> {event.description}
              </span>
            </div>
            <div className="pb-1 text-normal text-cyan-900">
              <span className="">
                <b>Location:</b>{event.location}
              </span>
            </div>
            <div className="pb-1 text-normal text-cyan-900">
              <span className="">
                <b>Date:</b> {event.date}
              </span>
            </div>
            <div className="pb-1 text-normal text-cyan-900">
              <span className="">
                <b>Time:</b> {event.startTime + ' - ' + event.endTime}
              </span>
            </div>
            <div className="pb-1 text-normal text-cyan-900 hover:text-orange-300">
              <a href={event.url}>
                <span className="">
                  <i>Event Website</i>
                </span>
              </a>
            </div>
            <div>
            {Auth.loggedIn() && !viewComments && event.comments.length > 1 ? <button onClick={() => {setViewComments(true)}}>View Comments</button> : Auth.loggedIn() && event.comments.length > 1 && <button onClick={() => {setViewComments(false)}}>Hide Comments</button>} 
              </div>
            <div>
              {Auth.loggedIn() && <button onClick={() => {setAddComment(true)}}>Add Comment</button>}
              </div>
            <div className="bottom-0 right-0 pt-3 text-sm text-amber-500 md:absolute md:pt-0">
              <button onClick={onJoin}
              className="px-4 py-2 mt-1 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300">
                Be Kind & Attend Event
              </button> 
              
            </div>
          </div>
        </div>
      </div>
      {addComment && <CommentForm key={event._id} eventId={event._id}/>}
      {viewComments && <CommentsList comments={event.comments} key={event._id}/>}
   
    </div>
  );
}
