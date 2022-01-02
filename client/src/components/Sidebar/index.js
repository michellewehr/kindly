import FriendsList from "../FriendsList";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { loading, data } = useQuery(QUERY_ME);

  const myData = data?.me || {};
  const myEvents = myData?.events || [];
  const myGoodDeeds = myData?.goodDeeds || [];
  // console.log(myData, 'me')
  // console.log(myGoodDeeds, 'good deeds')

  return (
    <div className="sidebar">
      <div className="flex flex-col w-full bg-cyan-700">
        {/* div for the profile picture and name */}
        <div className="flex content-center ">
          <div className="w-2/4 pt-2 mx-auto">
            <img
              className="antialiased rounded-lg shadow-lg"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            />
          </div>
        </div>
        {/* end of profile pic */}
        {/* div for name */}
        <h1 className="p-1 text-2xl text-center text-sky-100">
          {myData.firstName} {myData.lastName}
        </h1>
        {/* div for name end */}
        {/* points */}
        <div className="flex flex-row mx-auto ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="orange"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p className="pb-1 text-white">
            {myData.kindlyScore} Earned Kindly Points
          </p>
        </div>
        {/* end of points */}
        {/* location */}
        <div className="">
          <p className="px-6 mx-auto mb-2 text-center bg-orange-300 rounded w-max">
            {myData.location}
          </p>
        </div>
        {/* end of location */}
        {/* friends */}
        <div className="w-9/12 h-32 mx-auto mb-2 overflow-scroll text-center rounded bg-sky-100 ">
          {/* <FriendsList /> */}
        </div>
        {/* end of friends */}
        {/* Upcoming Events */}
        <div className="w-9/12 mx-auto mb-2 text-center rounded bg-sky-100">
          <h2 className="mb-1 underline">Upcoming Registered Events</h2>
          {/* div for each event */}
          {myEvents.map((event) => (
            <a key={event._id} className="bg-sky-100" href="">
              <div className="px-1 text-left">
                <h3 className="bg-cyan-600 hover:bg-orange-300">
                  {" "}
                  <Link to={`/event/${event._id}`}>{event.title}</Link>
                </h3>
                <p>{event.location}</p>
                <p>
                  {event.date} at {event.startTime} - {event.endTime}{" "}
                </p>
              </div>
            </a>
          ))}
        </div>
        {/* End of upcoming events */}
        <div className="w-9/12 mx-auto mb-2 text-center rounded bg-sky-100">
          <h2 className="mb-1 underline">Good Deads</h2>
          {/* div for good deeds */}
          {myGoodDeeds.map((goodDeed) => (
            <a key={goodDeed._id} className="bg-sky-100" href="">
              <div className="px-1 text-left">
                <h3 className="bg-cyan-600 hover:bg-orange-300">
                  {goodDeed.title}
                </h3>
                <p>{goodDeed.location}</p>
                <p>{goodDeed.date}</p>
              </div>
            </a>
          ))}
          {/* end of div for good deeds */}
        </div>
        {/* div for my postings */}
        {/* end of div for my postings */}
        {/* view my profile */}
        <a href="">
          <p className="pt-3 text-xl text-center text-sky-100 hover:text-orange-300">
            <Link to="myprofile">View My Full Profile</Link>
          </p>
        </a>
        {/* end of view my profile */}
      </div>
    </div>
  );
}
