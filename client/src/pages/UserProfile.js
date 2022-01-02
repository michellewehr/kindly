import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { useParams, Link } from "react-router-dom";

export default function UserProfile(props) {
  const { id } = useParams();
  console.log(id);
  const { loading, data, error } = useQuery(QUERY_USER, {
    variables: { id: id },
  });
  // console.log(data, 'user data')
  const user = data?.user || {};
  //   console.log(userEvents, "user events");
  const userGoodDeeds = user.goodDeeds;

  // console.log(userGoodDeeds, 'good deeds user')
  // console.log(user, 'user data')
  return (
    <div className="w-full">
      <div className="mx-auto">
        <div className="flex flex-col bg-white shadow-xl"></div>
        {/* Main */}
        <div className="">
          <div className="flex items-end mx-auto w-1/3	">
            <div className=" mx-auto w-1/2 m-3">
              <img
                className="antialiased rounded-lg shadow-lg"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              />
            </div>

            <div className="flex mx-auto mb-3">
              <div className="mt-3 flex-col mx-auto text-center">
                <h3 className="font-bold text-4xl text-gray-900 sm:text-4xl mb-3">
                  {user.firstName} {user.lastName}
                </h3>
                <div className="">
                  <p className="px-6 mx-auto mb-2 bg-orange-300 rounded w-max">
                    {user.location}
                  </p>
                </div>
                <div className="flex flex-row pt-1 mx-auto text-center space-around">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5  inline-block m-1 items-end"
                    viewBox="0 0 20 20"
                    fill="orange"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className=" ext-gray-900 ml-1 items-start">
                    Kindly Score: {user.kindlyScore}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto mb-2 rounded bg-sky-100">
          {/* beginining of event/good deed section*/}
          <div className="flex">
            {/* events */}
            <div className="w-1/2 m-2 flex-col">
              <h2>Events (completed or upcoming)</h2>
              {/* for each event */}
              {user.events &&
                user.events.map((event) => (
                  <div
                    key={event._id}
                    className="flex-col p-3 mt-2 antialiased bg-white rounded-lg shadow-lg  relative"
                  >
                    <div className="flex-row">
                      <div className="pb-1 text-2xl text-amber-500">
                        <span>{event.title}</span>
                        {event.verifyNumber >= event.attendees.length && (
                          <div className="inline-block group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="inline-block w-5 h-5 mx-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p className="invisible inline-block text-sm group-hover:visible">
                              Event Verified!
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="absolute right-0 top-0 m-1 text-sm">
                        Kindly Points: 10
                      </div>
                    </div>
                    <div className=" cursor-pointer text-normal hover:text-cyan-700 text-cyan-900">
                      <Link
                        to={`/profile/${event.host._id}`}
                        style={{ fontWeight: 700 }}
                      >
                        {event.host.firstName} {event.host.lastName}
                      </Link>
                    </div>
                    <div className="flex">
                      <p className="w-2/3">
                        <b>Description: </b> {event.description}
                      </p>
                      <p className="w-1/3">
                        <b>Location: </b> {event.location}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-2/3">
                        <b>Date: </b>
                        {event.date}
                      </p>
                      <p className="w-1/3">
                        <b>Time: </b>
                        {event.startTime} - {event.endTime}
                      </p>
                    </div>
                    <div className="flex">
                      <div className=" w-2/3 hover:text-orange-300">
                        <a href={event.url}>
                          <span className="w-1/2">
                            <i>Event Website</i>
                          </span>
                        </a>
                      </div>
                      {/* hover to see attendees list */}
                      <div className="relative flex flex-col group w-max">
                        <span className="cursor-pointer">
                          {event.attendees.length - 1} kind attendees
                        </span>
                      </div>
                    </div>
                    {/* button depending on attendence to join/leave/cancel event*/}
                  </div>
                ))}

              {/* end of for each event */}
            </div>
            {/* good deeds */}
            <div className="w-1/2 m-2 flex-col">
              <h2>Good Deeds (upcoming or completed)</h2>
              {userGoodDeeds &&
                userGoodDeeds.map((goodDeed) => (
                  <div className="flex-col p-3 mt-2 antialiased bg-white rounded-lg shadow-lg  relative">
                    <div className="flex-row">
                      <div className="pb-1 text-2xl text-amber-500">
                        <span>{goodDeed.title}</span>
                      </div>
                      <div className="absolute right-0 top-0 m-1">
                        Kindly Points: 10
                      </div>
                    </div>
                    <div className="pb-4 cursor-pointer text-normal hover:text-cyan-700 text-cyan-900">
                      <Link to={`/profile/${goodDeed.host._id}`}>
                        {goodDeed.host.firstName} {goodDeed.host.lastName}
                      </Link>
                    </div>
                    <div className="flex">
                      <p className="w-2/3">
                        <b>Description: </b> {goodDeed.deedText}
                      </p>
                      <p className="w-1/3">
                        <b>Location: </b> {goodDeed.location}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-2/3">
                        <b>Date: </b>
                        {goodDeed.date}
                      </p>
                      <p className="w-1/3">
                        <b>Time: </b>
                        {goodDeed.time}
                      </p>
                    </div>

                    {/* button depending on attendence to join/leave/cancel event*/}
                  </div>
                ))}
            </div>
            {/* good deed end */}
          </div>
          <div className="sm:flex sm:px-6 sm:py-5"></div>
          {/* </dl> */}
        </div>
      </div>
    </div>
  );
}
