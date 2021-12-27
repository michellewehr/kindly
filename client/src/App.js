import "./App.css";
import GoodDeed from "./components/GoodDeed";
import FriendsList from "./components/FriendsList";
import EventCard from "./components/EventCard";
import Comment from "./components/Comment";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Reply from "./components/Reply";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import GoodDeeds from "./pages/GoodDeeds";
import CommentForm from './components/CommentForm'

//* we can clean this up, just used it for testing so had to import everything
function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <div>
        {/* <Home /> */}
        <CommentForm/>

        {/* <GoodDeed /> */}
        {/* <FriendsList /> */}
        {/* <EventCard /> */}
        {/* <Comment /> */}
        {/* <Reply /> */}
        {/* <Profile /> */}
      </div>

      {/* <Sidebar /> */}
    </div>
  );
}

export default App;
