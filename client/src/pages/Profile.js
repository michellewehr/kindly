// import FriendsList from "../components/FriendsList";
import EventList from "../components/EventList";
import GoodDeedList from "../components/GoodDeedList";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { ADD_CONNECTION } from "../utils/mutations";

export default function Profile(me) {
  const { loading, data } = useQuery(QUERY_ME);

  const myData = data?.me || {};
  const myEvents = myData?.events || [];
  const myGoodDeeds = myData?.goodDeeds || [];

  const [renderEvents, toggleEvents] = useState(true);

  function toggleEventsDisplay() {
    toggleEvents(!renderEvents);
  }

  const [addConnection, { error }] = useMutation(ADD_CONNECTION);

  const handleAddConnection = async () => {
    try {
      await addConnection({
        variables: {
          id: myData.id,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen">
      <div
        className="overflow-hidden"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="overflow-hidden">
          {/* <!-- Background overlay, show/hide based on slide-over state. --> */}
          <div className="" aria-hidden="true">
            <div className=" right-0 h-full  max-w-full flex">
              {/* <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        --> */}
              <div className="w-screen max-w-2xl mx-auto">
                <div className="flex flex-col bg-white shadow-xl">
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2
                        className="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Profile
                      </h2>
                      <button
                        className="p-1 -ml-4 text-gray-400 focus:outline-none"
                        aria-label="Connect with me"
                        onClick={handleAddConnection}
                      >
                        Connect with me
                      </button>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                        >
                          <span className="sr-only">Close panel</span>
                          {/* <!-- Heroicon name: outline/x --> */}
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Main */}
                  <div className="divide-y divide-gray-200">
                    <div className="pb-6">
                      <div className="bg-indigo-700 h-24 sm:h-20 lg:h-28"></div>
                      <div className="-mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6 lg:-mt-15">
                        <div>
                          <div className="-m-1 flex">
                            <div className="inline-flex rounded-lg overflow-hidden border-4 border-white">
                              <img
                                className="flex-shrink-0 h-24 w-24 sm:h-40 sm:w-40 lg:w-48 lg:h-48"
                                src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 sm:ml-6 sm:flex-1">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-bold text-xl text-gray-900 sm:text-2xl">
                                {myData.firstName} {myData.lastName}
                              </h3>
                              <span className="ml-2.5 bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full">
                                <span className="sr-only">Online</span>
                              </span>
                            </div>

                            <p className="text-sm text-gray-500">
                              Location:{myData.location}
                            </p>
                            <p className="text-sm text-gray-500">
                              Kindly Points:{myData.kindlyPoints}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-5 sm:px-0 sm:py-0">
                      <dl className="space-y-8 sm:divide-y sm:divide-gray-200 sm:space-y-0">
                        <div className="sm:flex sm:px-6 sm:py-5">
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                            <div className="text-center">
                              {renderEvents ? (
                                <button onClick={toggleEventsDisplay}>
                                  View Upcoming Good Deeds
                                </button>
                              ) : (
                                <button onClick={toggleEventsDisplay}>
                                  View Upcoming Events
                                </button>
                              )}
                            </div>
                            {renderEvents ? (
                              <div className="w-9/12 mx-auto mb-2 text-center rounded bg-sky-100">
                                <h2 className="mb-1 underline">
                                  Upcoming Registered Events
                                </h2>
                                {/* div for each event */}
                                {myEvents.map((event) => (
                                  <a
                                    key={event._id}
                                    className="bg-sky-100"
                                    href=""
                                  >
                                    <div className="px-1 text-left">
                                      <h3 className="bg-cyan-600 hover:bg-orange-300">
                                        {event.title}
                                      </h3>
                                      <p>{event.location}</p>
                                      <p>
                                        {event.date} at {event.startTime} -{" "}
                                        {event.endTime}{" "}
                                      </p>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            ) : (
                              <div className="w-9/12 mx-auto mb-2 text-center rounded bg-sky-100">
                                <h2 className="mb-1 underline">Good Deads</h2>
                                {/* div for good deeds */}
                                {myGoodDeeds.map((goodDeed) => (
                                  <a
                                    key={goodDeed._id}
                                    className="bg-sky-100"
                                    href=""
                                  >
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
                            )}
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2"></dd>
                        </div>
                        <div className="sm:flex sm:px-6 sm:py-5">
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                            Connections
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                            {myData.connections}
                          </dd>
                        </div>
                        <div className="sm:flex sm:px-6 sm:py-5"></div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
