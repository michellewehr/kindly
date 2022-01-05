import { useParams } from "react-router";
import { QUERY_GOOD_DEED } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Loading from "../Loading";
import { Link } from "react-router-dom";

export default function GoodDeedLink() {
  const { id } = useParams();
  console.log(id, "id from url");
  const { loading, data, error } = useQuery(QUERY_GOOD_DEED, {
    variables: { id: id },
  });

  function routeChange() {
    window.location.replace("/");
  }

  const goodDeed = data?.goodDeed || {};
  console.log(goodDeed, "from data");
  console.log(goodDeed.title, "title good deed");

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
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
                    <div className="flex flex-row flex-wrap w-full px-3 md:w-2/3">
                      <div className="relative w-full pt-3 font-semibold text-left text-gray-700 md:pt-0">
                        <div className="flex flex-row pb-1 text-2xl leading-tight text-amber-500">
                          <Link to={`/gooddeed/${goodDeed._id}`}>
                            {goodDeed.title}
                          </Link>
                        </div>
                        <div className="pb-4 cursor-pointer text-normal hover:text-cyan-700 text-cyan-900">
                          <Link to={`/profile/${goodDeed.host._id}`}>
                            {goodDeed.host.firstName} {goodDeed.host.lastName}
                          </Link>{" "}
                        </div>
                        <div className="pb-1 text-normal text-cyan-900">
                          <span className="">
                            <b>Description:</b> {goodDeed.deedText}
                          </span>
                        </div>
                        <div className="pb-1 text-normal text-cyan-900">
                          <span className="">
                            <b>Location:</b>
                            {goodDeed.location}
                          </span>
                        </div>
                        <div className="pb-1 text-normal text-cyan-900">
                          <span className="">
                            <b>Date:</b> {goodDeed.date}
                          </span>
                        </div>
                        {/* <div className="pb-1 text-normal text-cyan-900">
                          <span className="">
                            <b>Time:</b> Get Time
                          </span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* event info ends here */}
              <div class="mt-5 sm:mt-6">
                <button
                  onClick={routeChange}
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  <Link to="{/}">Close</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
