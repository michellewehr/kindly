import EventList from "../components/EventList";
import { ADD_GOOD_DEED } from "../utils/actions";
import Footer from "../components/Footer";
// import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Auth from '../utils/auth';
import GoodDeedList from "../components/GoodDeedList";


export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <div className="flex w-full justify-between">
        {Auth.loggedIn() && (
        <Sidebar />
        )}
        {/* <EventList /> */}
        <GoodDeedList/>
      </div>
    </div>
  );
}
