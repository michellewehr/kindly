import { useState } from "react";
import { useMutation } from "@apollo/client";
// import { ADD_COMMENT } from "../../utils/mutations";
// import { QUERY_COMMENTS, QUERY_ME } from "../../utils/queries";

export default function CommentForm() {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  // const [addComment, { error }] = useMutation(ADD_COMMENT, {
  //   update(cache, { data: { addComment } }) {
  //     try {
  //       // update comment array's cache
  //       // could potentially not exist yet, so wrap in a try/catch
  //       const { comments } = cache.readQuery({ query: QUERY_COMMENTS });
  //       cache.writeQuery({
  //         query: QUERY_COMMENTS,
  //         data: { comments: [addComment, ...comments] },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }

  //     // update me object's cache
  //     const { me } = cache.readQuery({ query: QUERY_ME });
  //     cache.writeQuery({
  //       query: QUERY_ME,
  //       data: { me: { ...me, comments: [...me.comments, addComment] } },
  //     });
  //   },
  // });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setCommentText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     await addComment({
  //       variables: { commentText },
  //     });

  //     // clear form value
  //     setCommentText("");
  //     setCharacterCount(0);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <form action="">
      <div className="eventCard">
        <div className="rounded-lg mt-2 shadow-lg bg-white	 w-full flex flex-row flex-wrap p-3 antialiased">
          <div className="md:w-1/3 w-full">
            {/* get event image */}
            <img
              className=" mx-auto rounded-lg shadow-lg antialiased h-1/2 center pb-2"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            />
            <div className="flex justify-center">
              <div className="mb-3 w-96">
                <input
                  className="form-control block px-3 py-1.5 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="file"
                  id="eventImage"
                />
              </div>
            </div>
          </div>
          <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
            <div className="w-full text-gray-700 font-semibold relative pt-3 md:pt-0">
              <div className="flex flex-row text-2xl text-amber-500 leading-tight pb-1">
                {" "}
                {/* //! get event name */}
                <label
                  for="eventTitle"
                  className="block text-xl pr-2 font-medium"
                >
                  Event Name:{" "}
                </label>
                <div className="mt-1 w-2/4">
                  <input
                    type="text"
                    name="eventTitle"
                    id="eventTitle"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-black"
                    placeholder="Event Title"
                  />
                </div>
              </div>
              <div className="text-sm text-amber-500 md:absolute pt-3 md:pt-0 top-0 right-0">
                {/* //! get kindly points */}
                Kindly Points: <b>+10</b>
              </div>
              <div className="text-normal hover:text-cyan-700 cursor-pointer text-cyan-900 pb-4 text-left">
                <span className="pb-1">
                  {/* get user from me */}
                  User Host
                </span>
              </div>
              <div className="text-normal text-cyan-900 pb-3">
                <label
                  for="eventDescription"
                  className="block text-lg pr-2 font-medium text-left"
                >
                  Description:{" "}
                </label>
                <div className="mt-1">
                  <textarea
                    type="text"
                    name="eventDescription"
                    id="eventDescription"
                    className=" text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="This event is to help save the dolphins..."
                  />
                </div>
              </div>
              <div className="text-normal text-cyan-900 pb-3">
                <span className="flex flex-row">
                  {/* //! get event location */}
                  <label
                    for="eventLocation"
                    className="block text-lg pr-2 font-medium text-left"
                  >
                    Location:{" "}
                  </label>
                  <input
                    type="text"
                    name="eventLocation"
                    id="eventLocation"
                    className=" text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md w-9/12"
                    placeholder="Event Location"
                  />
                </span>
              </div>
              <div className="text-normal text-cyan-900 pb-3">
                <span className="flex flex-row">
                  {/* //! get event location */}
                  <label
                    for="eventDate"
                    className="block text-lg pr-2 font-medium text-left"
                  >
                    Date:{" "}
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    id="eventDate"
                    className=" text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </span>
              </div>
              <div className="text-normal text-cyan-900 pb-1 flex">
                <div className="flex flex-row w-full">
                  {/* //! get event location */}
                  <span className="w-1/2 flex">
                    <label
                      for="startTime"
                      className="block text-lg pr-2 font-medium text-left"
                    >
                      Start Time:{" "}
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      id="startTime"
                      className="text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md m-1"
                    />
                  </span>

                  <span className="w-1/2 flex">
                    <label
                      for="endTime"
                      className="pl-3 block text-lg pr-2 font-medium text-left"
                    >
                      End Time:{" "}
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      id="endTime"
                      className="text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md m-1"
                    />
                  </span>
                </div>
              </div>
              <div className="text-normal text-cyan-900 pb-1">
                <span className="flex flex-row">
                  <label
                    for="eventUrl"
                    className="block text-lg pr-2 font-medium text-left"
                  >
                    More Info:{" "}
                  </label>
                  <input
                    type="text"
                    name="eventUrl"
                    id="eventUrl"
                    className="text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md w-9/12"
                    placeholder="Additional Link to Url"
                  />
                </span>
              </div>
              <div className="text-sm text-amber-500 pt-3 text-left">
                <button
                  type="submit"
                  className="bg-cyan-700  hover:bg-orange-300 text-white font-bold py-2 px-4 rounded mt-1"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
