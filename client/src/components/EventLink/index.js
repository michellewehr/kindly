import EventCard from "../EventCard";
import { useParams } from "react-router";
import { QUERY_EVENT } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Loading from "../Loading";
import { Link } from "react-router-dom";

export default function EventLink() {
  const { id } = useParams();
  console.log(id, "id from url");
  const { loading, data, error } = useQuery(QUERY_EVENT, {
    variables: { id: id },
  });

  const event = data?.event || {};
  console.log(event, "from data");
  console.log(event.title, "title event");

  function reRoute() {
    window.location.replace("/");
  }

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto w-full"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0 w-full">
        {/* <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        {/*
    <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          {data && (
            <div className="eventCard">
              <div className="flex flex-row flex-wrap w-full p-3 mt-2 antialiased bg-white rounded-lg shadow-lg">
                <div className="w-full md:w-1/3">
                  <img
                    className="antialiased rounded-lg shadow-lg xl"
                    src={event.image}
                    alt="Alt tag"
                  />
                </div>
                <div className="flex flex-row flex-wrap w-full px-3 md:w-2/3">
                  <div className="relative w-full pt-3 font-semibold text-left text-gray-700 md:pt-0">
                    <div className="flex flex-row pb-1 text-2xl leading-tight text-amber-500">
                      <Link to={`/event/${event._id}`}>{event.title}</Link>
                      {/* verified check start */}
                      {event.attendees.length > 1 &&
                        event.verifyNumber >= event.attendees.length / 2 && (
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
                              Event Verified
                            </p>
                          </div>
                        )}
                      {/* verified check end */}
                    </div>
                    <div className="pb-4 cursor-pointer text-normal hover:text-cyan-700 text-cyan-900">
                      <Link to={`/profile/${event.host._id}`}>
                        {event.host.firstName} {event.host.lastName}
                      </Link>{" "}
                    </div>

                    <div className="pb-1 text-normal text-cyan-900">
                      <span className="">
                        <b>Description:</b> {event.description}
                      </span>
                    </div>
                    <div className="pb-1 text-normal text-cyan-900">
                      <span className="">
                        <b>Location:</b>
                        {event.location}
                      </span>
                    </div>
                    <div className="pb-1 text-normal text-cyan-900">
                      <span className="">
                        <b>Date:</b> {event.date}
                      </span>
                    </div>
                    <div className="pb-1 text-normal text-cyan-900">
                      <span className="">
                        <b>Time:</b> {event.startTime + " - " + event.endTime}
                      </span>
                    </div>
                    <div className="pb-1 text-normal text-cyan-900 hover:text-orange-300">
                      <a href={event.url}>
                        <span className="">
                          <i>Event Website</i>
                        </span>
                      </a>
                    </div>

                    {/* hover to see attendees list */}
                    <div className="relative flex flex-col group w-max">
                      <span className="cursor-pointer">
                        View {event.attendees.length} Attendees
                      </span>
                      <ul className="top-0 z-10 flex-col justify-center hidden text-sm text-black bg-orange-300 rounded attendee-list group-hover:block w-max">
                        {event.attendees.map((attendee, index) => (
                          <li key={attendee._id} className="py-1 pl-4 pr-1">
                            <Link
                              to={`/profile/${attendee._id}`}
                              style={{ fontWeight: 700 }}
                            >
                              {index + 1}. {attendee.firstName}{" "}
                              {attendee.lastName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* event info ends here */}
          <div class="mt-5 sm:mt-6">
            <button
              onClick={reRoute}
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              <Link to="{/}">Close</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
