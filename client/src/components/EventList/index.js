import EventCard from "../EventCard";
import { useEffect, useState } from "react";
import Auth from '../../utils/auth';
import EventModal from "../EventModal";
import Comment from '../Comment';

export default function EventList({ events, me }) {
  const [eventModalOpen, setEventModalOpen] = useState(false);
  console.log(events, 'line 11 ')
  const userMeData = me || {};
  console.log(userMeData, 'logged in user id line 10');

  if (!events.length) {
    return <div>No events found</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">

      {eventModalOpen && <EventModal onClose={() => { setEventModalOpen(false) }} />}
      <div>
       <div>
        {Auth.loggedIn() && (
          <div className="relative h-16 text-sm text-amber-500">
            <button onClick={() => { setEventModalOpen(true) }} className="absolute right-0 h-16 px-4 py-2 mt-1 mr-2 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300">
              Create Event
            </button>
          </div>
        )}
        {events &&
          events.map((event) => (
            < div

            key={event.title}
            >
          <EventCard
            event={event}
            me={userMeData}
          />
        </div>
          ))}
        </div>
      </div>
    </div>
  );
}







