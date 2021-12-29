import EventCard from "../EventCard";
import { useEffect, useState } from "react";
import { QUERY_EVENTS } from '../../utils/queries'
import { useQuery } from "@apollo/client";
import Auth from '../../utils/auth';
import EventModal from "../EventModal";
import Comment from '../Comment';

export default function EventList() {
  const { loading, data } = useQuery(QUERY_EVENTS);
  const [eventModalOpen, setEventModalOpen] = useState(false);


  const eventData = data?.events || [];
  console.log(eventData)
  console.log(eventData.comments);
  eventData.map((event) => event.comments.map((comment) => {
    console.log(comment) 
  }));


  return (
    <div>
       {eventModalOpen && <EventModal onClose={() => {setEventModalOpen(false)}}/>}   
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
            {Auth.loggedIn() && (
         <div className="text-sm text-amber-500 relative h-16">
        <button onClick={() => {setEventModalOpen(true)}} className="h-16 bg-cyan-700 hover:bg-orange-300 absolute right-0 mr-2 text-white font-bold py-2 px-4 rounded mt-1">
          Create Event
        </button>
      </div>
        )}
          {eventData.map((event) => (
            <EventCard
              key={event._id}
              _id={event._id}
              title={event.title}
              image={event.image}
              location={event.location}
              url={event.url}
              comments={event.comments}
              description={event.description}
              attendees={event.attendees}
            />
          ))}
      
         
        
        </div>
      )}
    </div>
  )
}
