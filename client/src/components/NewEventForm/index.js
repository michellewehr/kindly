import { CREATE_EVENT } from "../../utils/mutations";
import { QUERY_EVENTS, QUERY_ME } from "../../utils/queries";
import { useState } from "react";
import { useMutation } from "@apollo/client";
// import { SuccessModal } from "../SuccessModal";

export default function NewEvent({ onEventSubmit, showSuccessMod }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    url: "",
    image: "",
  });

  const [addEvent, { error }] = useMutation(CREATE_EVENT, {
    update(cache, { data: { createEvent } }) {
      try {
        const { events } = cache.readQuery({ query: QUERY_EVENTS });
        cache.writeQuery({
          query: QUERY_EVENTS,
          data: { events: [createEvent, ...events] },
        });
      } catch (e) {
        console.error(e);
      }

      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, events: [addEvent, ...me.events, addEvent] } },
      });
    },
  });
  // update state based on form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEvent({
        variables: { ...formData },
      });
      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        startTime: "",
        endTime: "",
        url: "",
        image: "",
      });
    } catch (e) {
      console.error(e);
    }
    onEventSubmit();
    showSuccessMod();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-center">Add an Event</h1>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-title"
            >
              Title
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-title"
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-description"
            >
              Description
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-description"
              type="text"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-location"
            >
              Location
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-location"
              type="text"
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-date"
            >
              Date
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-date"
              type="date"
              placeholder="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-startTime"
            >
              Start Time
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-startTime"
              type="time"
              placeholder="Start Time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-endTime"
            >
              End Time
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-endTime"
              type="time"
              placeholder="End Time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-url"
            >
              Website
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-url"
              type="text"
              placeholder="Website"
              name="url"
              value={formData.url}
              onChange={handleChange}
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-url"
            >
              Upload Image
              <i class="fas fa-image    "></i>
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-image"
              type="text"
              defaultValue={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwu0wWo1ihMgv3T-w1qYj0r9QY87E9iq4ZDA&usqp=CAU"
              }
              placeholder=""
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          className="w-full p-3 rounded-lg shadow-lg"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
