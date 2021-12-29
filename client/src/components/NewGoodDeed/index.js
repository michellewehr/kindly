
export default function NewGoodDeed() {
    return (
        <div className="flex flex-col w-full p-3 mt-2 antialiased bg-white rounded-lg shadow-lg">
          <div className="flex flex-row flex-wrap w-full px-3 ">
            <div className="relative w-full pt-3 font-semibold text-left text-gray-700 md:pt-0">
              <div className="flex flex-row pb-1 text-2xl leading-tight text-amber-500">
                <form>
                <label className='text-black text-sm'for='title'>Name of Good Deed:</label>
                  <input
                    className="w-full p-3 rounded-lg shadow-lg text-sm"
                    type="text"
                    name="title"
                    placeholder="Good Deed Title"
                  />
                    <label className='text-black text-sm'for='deedText'>Description:</label>
                  <textarea
                    className="w-full p-3 rounded-lg shadow-lg text-sm"
                    type="text"
                    name="deedText"
                    placeholder="Description of Good Deed"
                  />
                  <label className='text-black text-sm'for='date'>Date:</label>
                  <input
                    className="w-full p-3 rounded-lg shadow-lg text-sm"
                    type="date"
                    name="date"
                  />
                    <label className='text-black text-sm'for='loaction'>Location:</label>
                  <input
                    className="w-full p-3 rounded-lg shadow-lg text-sm"
                    type="text"
                    name="location"
                    placeholder="Good Deed Location"
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