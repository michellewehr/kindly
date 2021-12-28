import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
// import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Auth from '../utils/auth';

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <div className="flex w-full justify-between">
        {Auth.loggedIn() && (
        <Sidebar />
        )}
        <EventCard />
      </div>
    </div>
  );
}
