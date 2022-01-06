import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_GOOD_DEED } from "../../utils/mutations";
import { QUERY_GOOD_DEEDS, QUERY_ME } from "../../utils/queries";

export default function NewGoodDeed({ onDeedSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    url: "",
  });

  const [addGoodDeed, { error }] = useMutation(CREATE_GOOD_DEED, {
    update(cache, { data: { createGoodDeed } }) {
      try {
        const { goodDeeds } = cache.readQuery({ query: QUERY_GOOD_DEEDS });
        cache.writeQuery({
          query: QUERY_GOOD_DEEDS,
          data: { goodDeeds: [createGoodDeed, ...goodDeeds] },
        });
      } catch (e) {
        console.error(e);
      }

      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: {
          me: { ...me, goodDeeds: [addGoodDeed, ...me.goodDeeds, addGoodDeed] },
        },
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
      await addGoodDeed({
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
      });
    } catch (e) {
      console.error(e);
    }
    onDeedSubmit();
  };

  return (
    <div className="flex flex-col w-full p-3 mt-2 antialiased bg-white rounded-lg shadow-lg">
      <div className="flex flex-row flex-wrap w-full px-3 ">
        <div className="relative w-full pt-3 font-semibold text-left text-gray-700 md:pt-0">
          <div className="flex flex-row pb-1 text-2xl leading-tight text-amber-500">
            <form onSubmit={handleSubmit}>
              <label className="text-sm text-black" for="title">
                Name of Good Deed:
              </label>
              <input
                className="w-full p-3 text-sm rounded-lg shadow-lg text-black"
                type="text"
                name="title"
                placeholder="Good Deed Title"
                value={formData.title}
                onChange={handleChange}
              />
              <label className="text-sm text-black" for="deedText">
                Description:
              </label>
              <textarea
                className="w-full p-3 text-sm rounded-lg shadow-lg text-black"
                type="text"
                name="deedText"
                placeholder="Description of Good Deed"
                value={formData.deedText}
                onChange={handleChange}
              />
              <label className="text-sm text-black" for="date">
                Date:
              </label>
              <input
                className="w-full p-3 text-sm rounded-lg shadow-lg text-black"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              <label className="text-sm text-black" for="location">
                Location:
              </label>
              <input
                className="w-full p-3 text-sm rounded-lg shadow-lg text-black"
                type="text"
                name="location"
                placeholder="Good Deed Location"
                value={formData.location}
                onChange={handleChange}
              />
              <button
                className="w-full p-3 rounded-lg shadow-lg"
                type="submit"
                value="Submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
