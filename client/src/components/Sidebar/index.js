import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { checkKindlyPoints } from "../../utils/kindlyPointsFormatter";
import Loading from "../Loading";

export default function Sidebar() {
  const { loading, data } = useQuery(QUERY_ME);

  const myData = data?.me || {};
  const myEvents = myData?.events || [];
  const myGoodDeeds = myData?.goodDeeds || [];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="sidebar hidden lg:flex">
      <div className="flex flex-col w-96 bg-slate-100 py-6">
        {/* div for the profile picture and name */}
        <div className="flex content-center ">
          <div className="w-2/4 py-4 mx-auto">
            <img
              className="antialiased rounded-lg shadow-lg"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Profile picture"
            />
          </div>
        </div>

        <h2 className="p-1 text-2xl text-center text-black">
          <Link
            to="myprofile"
            className="bg-orange-300 rounded-lg py-0.5 px-4 hover:bg-orange-400 my-6"
          >
            {myData.firstName} {myData.lastName}
          </Link>
        </h2>

        <div className="flex flex-row mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mt-2.5"
            viewBox="0 0 20 20"
            fill="orange"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p className="pb-1 text-black text-center mt-2">
            {checkKindlyPoints(myData.kindlyScore)}
          </p>
        </div>

        {/* location */}
        <div className="mb-7">
          <p className="px-6 mx-auto m-2 text-center lg:text-lg bg-white rounded-lg w-max">
            {myData.location}
          </p>
        </div>
        {/* end of location */}

        {/* Upcoming Events */}
        <div className="w-5/6 mx-auto mb-2 text-center  rounded-lg p-1 max-h-96">
          <h2 className="mb-1 underline  py-2 rounded-lg text-xl font-bold">
            Your Upcoming Events
          </h2>
        </div>
        <div className="w-5/6 mx-auto mb-8 text-center bg-white border-4 border-slate-200 rounded-lg p-1 max-h-96 overflow-auto">
          {/* div for each event */}
          {myEvents.length ? (
            myEvents.map((event) => (
              <a key={event._id} className="bg-sky-100" href="#">
                <div className="p-1 text-left my-4 rounded-lg">
                  <Link to={`/event/${event._id}`}>
                    <h3 className="bg-sky-100 hover:bg-orange-300 text-black text-center rounded-lg text-md font-bold">
                      {event.title}
                    </h3>
                  </Link>
                  <p className="text-black">
                    <b>Location:</b> {event.location}
                  </p>
                  <p className="text-black">
                    <b>Date: </b>
                    {event.date}
                  </p>
                  <p className="text-black">
                    <b>Time: </b>
                    {event.startTime} - {event.endTime}{" "}
                  </p>
                </div>
              </a>
            ))
          ) : (
            <div className="p-2">You have no upcoming events</div>
          )}
        </div>
        {/* End of upcoming events */}
        <div className="w-5/6 mx-auto mb-2 text-center rounded-lg p-1 max-h-96">
          <h2 className="mb-1 underline py-2 rounded-lg text-xl font-bold">
            Your Upcoming Good Deeds
          </h2>
        </div>
        <div className="w-5/6 mx-auto mb-2 text-center bg-white border-4 border-slate-200 rounded-lg p-1 max-h-96 overflow-auto">
          {/* <h2 className="mb-1 underline bg-orange-300 py-2 rounded-lg">Good Deads</h2> */}
          {/* div for good deeds */}
          {myGoodDeeds.length ? (
            myGoodDeeds.map((goodDeed) => (
              <a key={goodDeed._id} className="bg-sky-100" href="#">
                <div className="p-1 text-left my-4 rounded-lg">
                  <Link to={`/gooddeed/${goodDeed._id}`}>
                    <h3 className="bg-sky-100 hover:bg-orange-300 text-black text-center bold rounded-lg text-md font-bold">
                      {goodDeed.title}
                    </h3>
                  </Link>
                  <p className="text-black">
                    <b>Location:</b> {goodDeed.location}
                  </p>
                  <p className="text-black">
                    <b>Date: </b>
                    {goodDeed.date}
                  </p>
                </div>
              </a>
            ))
          ) : (
            <div className="p-2">You have no upcoming Good Deeds</div>
          )}
        </div>
        <a href="">
          <p className="py-5 text-xl text-center text-sky-100 hover:text-orange-300">
            <Link to="myprofile">View My Full Profile</Link>
          </p>
        </a>
        {/* end of view my profile */}
      </div>
    </div>
  );
}
