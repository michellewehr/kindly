// import { createSourceEventStream } from "graphql"
import CommentForm from "../CommentForm";
import { Link } from "react-router-dom";
import CommentsList from "../CommentsList";
import { useState } from "react";
import Auth from '../../utils/auth';
import { CANCEL_EVENT, JOIN_EVENT, LEAVE_EVENT } from "../../utils/mutations";
// import { QUERY_ME } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import AttendeesList from "../AttendeesList";

export default function EventCard({ event, me }) {
  const [viewComments, setViewComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [joinEvent] = useMutation(JOIN_EVENT);
  const [leaveEvent] = useMutation(LEAVE_EVENT);
  const [cancelEvent] = useMutation(CANCEL_EVENT);
  // const [joined, setJoined] = useState(false);
  // console.log(event.attendees, 'attendees');
  const [count, setCount] = useState(0);
  const [viewAttendees, setViewAttendees] = useState(false);

  const attendees = event.attendees;
  console.log(attendees, 'attendees');
  const hostId = event.host._id

  const onJoin = async e => {
    e.preventDefault();
    try {
      const eventId = event._id;
      await joinEvent({ variables: { eventId } });
    } catch (e) {
      console.error(e);
    }
    checkAttendance();
    window.location.reload(false);
  };

  async function onLeave() {
    const eventId = event._id;
    try {
      await leaveEvent({ variables: { eventId } });
    } catch (e) {
      console.error(e);
    }
    window.location.reload(false);
  }

  async function onCancel() {
    const eventId = event._id;
    try {
      await cancelEvent({ variables: { eventId } });
    } catch (e) {
      console.error(e);
    }
    window.location.reload(false);
  }


  const checkAttendance = () => {

    // check if current user is host
    if (hostId === me._id) {
      return (
        <div>
          <button onClick={onCancel}
            className="px-4 py-2 mr-3 mx-3 mt-1 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300">
            Cancel Event
          </button>
          {count > (attendees.length / 2 + 1) ?
            <h1 className="px-4 py-2 mt-1 font-bold text-black rounded bg-amber-200">Event Verified</h1> :

            <button onClick={() => setCount(count + 1)}
              className="px-4 py-2 mt-1 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300">
              Verify Event
            </button>}
        </div>
      )
    };

    // check if user is attendee
    for (let i = 0; i < attendees.length; i++) {
      if (attendees[i]._id === me._id) {
        // console.log('match!');
        return (
          <div>
            <button className='pr-3' onClick={onLeave}
              className="px-4 py-2 mx-3 mt-1 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300">
              Leave Event
            </button>
            {count > attendees.length / 2 + 1 ? <h1
              className="px-4 py-2 mt-1 font-bold text-black rounded bg-amber-200 ">
              Event Verified            </h1> : <button onClick={() => setCount(count + 1)}
                className="px-4 py-2 mt-1 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300">
              Verify Event       </button>}
          </div>
        )
      }
    }
    return (
      <button className='pr-3' onClick={onJoin}
        className="px-4 py-2 mt-1 mx-3 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300">
        Be Kind & Attend Event
      </button>
    )
  }



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
            {/* button div for viewing comments/ hiding comments */}
            <div>
              {Auth.loggedIn() && !viewComments && event.comments.length > 1 ? <button onClick={() => { setViewComments(true) }}>View Comments</button> : Auth.loggedIn() && event.comments.length > 1 && <button onClick={() => { setViewComments(false) }}>Hide Comments</button>}
            </div>
            {/* button div to add comment */}
            <div>
              {Auth.loggedIn() && <button onClick={() => { setAddComment(true) }}>Add Comment</button>}
            </div>
            {/* hover to see attendees list */}
            <div className="group relative flex flex-col">
              {/* {Auth.loggedIn() && !viewAttendees && event.attendees.length > 1 ? 
                <button onClick={() => { setViewAttendees(true) }}>View Attendees</button> 
                : Auth.loggedIn() && event.attendees.length > 1 && 
                <button onClick={() => { setViewAttendees(false) }}>Hide Attendees</button>} */}
                <span>View Attendees</span>
                <ul className="invisible group-hover:visible top-0 z-10 flex flex-col justify-center text-sm bg-orange-300 text-black w-1/3 rounded">
                  {attendees.map((attendee) => (
                        <li key={attendee._id} className="">
                            <Link
                              to={`/profile/${attendee._id}`}
                              style={{ fontWeight: 700 }}
                            >{attendee.firstName} {attendee.lastName}
                            </Link>
                        </li>
                      ))}
              </ul>
            </div>
            {/* button depending on attendence to join/leave/cancel event*/}
            <div className="bottom-0 right-0 pt-3 text-sm text-amber-500 md:absolute md:pt-0">
              {Auth.loggedIn() &&
            <div>
                  {checkAttendance()}
                </div>}
            </div>
          </div>
        </div>
      </div>
      {addComment && <CommentForm key={event._id} eventId={event._id} />}
      {viewComments && <CommentsList comments={event.comments} key={event._id} />}
    </div>
  );
}
