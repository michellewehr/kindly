import "./App.css";
import GoodDeed from "./components/GoodDeed";
import FriendsList from "./components/FriendsList";
import EventCard from "./components/EventCard";
import Comment from "./components/Comment";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Reply from "./components/Reply";

function App() {
  return (
    <div className="App">
      <h1>Something</h1>
      <Header />
      <div>
         <GoodDeed />
      {/* <FriendsList /> */}
      <EventCard />
      <Comment />
      <Reply />
      </div>

      <Sidebar />
    </div>
    //! pages
    // landing page
    //*components
    //Event Cards
    //nav bar
    //footer
    //side bar(if logged in)
    //friends list
    //upcoming events
    //good deeds
    // login page
    //* components
    //login card
    //nav bar
    // footer
    // signup page
    //* components
    //signup card
    //nav bar
    // footer
    //profile page
    //* components
    //Event cards
    //connections
    //good deeds
    //* components
    //good deed Cards
    //
  );
}

export default App;
