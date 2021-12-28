import EventCard from "../EventCard";
import { useEffect } from "react";
import { QUERY_EVENTS } from '../../utils/queries'
import { useQuery } from "@apollo/client";

export default function EventList() {
  const { loading, data } = useQuery(QUERY_EVENTS)

  const eventData = data?.events || [];
  console.log(eventData)

  // if (loading) {
  //   return (
  //     <div>
  //       Loading ...
  //     </div>
  //   )
  // }

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {eventData.map((event) => (
              <EventCard
              key={event._id}
              _id={event._id}
              host={event.host}
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
