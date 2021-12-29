import EventCard from "../EventCard";
import { useEffect, useState } from "react";
import Auth from '../../utils/auth';
import EventModal from "../EventModal";
import Comment from '../Comment';

export default function EventList({ events }) {
  const [eventModalOpen, setEventModalOpen] = useState(false);
  // console.log(events, 'line 11 ')

  if (!events.length) {
    return <div>No events found</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {eventModalOpen && <EventModal onClose={() => { setEventModalOpen(false) }} />}
      <div>
        {Auth.loggedIn() && (
          <div className="text-sm text-amber-500 relative h-16">
            <button onClick={() => { setEventModalOpen(true) }} className="h-16 bg-cyan-700 hover:bg-orange-300 absolute right-0 mr-2 text-white font-bold py-2 px-4 rounded mt-1">
              Create Event
            </button>
          </div>
        )}
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
          />
        ))}
      </div>
    </div>
  )
}


