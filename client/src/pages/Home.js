import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
// import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Auth from '../utils/auth';

export default function Home() {
  return (
    <div className="min-h-screen">
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
