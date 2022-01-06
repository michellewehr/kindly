import EventList from "../components/EventList";
import Footer from "../components/Footer";
// import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Auth from "../utils/auth";
import GoodDeedList from "../components/GoodDeedList";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS, QUERY_ME } from "../utils/queries";
import Loading from "../components/Loading";

export default function Home() {
  const { loading, data } = useQuery(QUERY_EVENTS);
  const { data: userData } = useQuery(QUERY_ME);

  const events = data?.events || [];

  const loggedIn = Auth.loggedIn();

  const [renderEvents, toggleEvents] = useState(true);

  function toggleEventsDisplay() {
    toggleEvents(!renderEvents);
  }

  return (
    <div>
      {/* <Header /> */}
      <div className="text-center bg-orange-300 bold">
        {renderEvents ? (
          <button className="text-green" onClick={toggleEventsDisplay}>
            View Good Deeds
          </button>
        ) : (
          <button onClick={toggleEventsDisplay}>View Events</button>
        )}
      </div>

      <div className="flex justify-between w-full">
        {Auth.loggedIn() && (
          <>
            <Sidebar />
          </>
        )}
        {renderEvents ? (
          <EventList events={events} me={userData?.me} host={userData?.me} />
        ) : (
          <GoodDeedList me={userData?.me} />
        )}
      </div>
    </div>
  );
}
