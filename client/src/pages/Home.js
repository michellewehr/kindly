import EventList from "../components/EventList";
import Footer from "../components/Footer";
// import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Auth from '../utils/auth';
import GoodDeedList from "../components/GoodDeedList";
import {useState} from 'react';
import {useQuery} from '@apollo/client';
import {QUERY_EVENTS, QUERY_ME} from '../utils/queries';


export default function Home() {
const { loading, data } = useQuery(QUERY_EVENTS);
const { data: userData } = useQuery(QUERY_ME);
const events = data?.events || [];

const loggedIn = Auth.loggedIn();

  const [renderEvents, toggleEvents ] = useState(true);

  function toggleEventsDisplay() {
    toggleEvents(!renderEvents)
  }

  return (
    <div>

      {/* <Header /> */}
       <div className="text-center">
          {renderEvents ? <button onClick={toggleEventsDisplay}>View Good Deeds</button>: <button onClick={toggleEventsDisplay}>View Events</button>}
        </div>

      <div className="flex w-full justify-between">
        {Auth.loggedIn() && (
          <>
        <Sidebar />

    </>
        )}
        {renderEvents ? <EventList
            events={events}
            host={userData?.me}
              />: <GoodDeedList/>}
       </div>
   </div>
  );
}
