export default function EventCard(events) {
  // if (!events.length) {
  //   return (
  //     <div>
  //       <h3>No events yet!</h3>
  //     </div>
  //   )
  // }

  return (
    <div className="eventCard">
      <div className="rounded-lg mt-2 shadow-lg bg-white	 w-full flex flex-row flex-wrap p-3 antialiased">
        <div className="md:w-1/3 w-full">
          <img
            className="rounded-lg shadow-lg antialiased"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          />
        </div>
        <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
          <div className="w-full text-gray-700 font-semibold relative pt-3 md:pt-0">
            <div className="flex flex-row text-2xl text-amber-500 leading-tight pb-1">
              {" "}
              Event Name
            </div>
            <div className="text-sm text-amber-500 md:absolute pt-3 md:pt-0 top-0 right-0">
              Kindly Points: <b>+10</b>
            </div>
            <div className="text-normal hover:text-cyan-700 cursor-pointer text-cyan-900 pb-4">
              <span className="pb-1">User Host</span>
            </div>
            <div className="text-normal text-cyan-900 pb-1">
              <span className="">
                <b>Description:</b> lorem fdjasfkldsjafkldsjafl fdjsalfkjdsalf
                dasfjdklsafjdklsaf{" "}
              </span>
            </div>
            <div className="text-normal text-cyan-900 pb-1">
              <span className="">
                <b>Location:</b>Tolland, CT
              </span>
            </div>
            <div className="text-normal text-cyan-900 pb-1">
              <span className="">
                <b>Date:</b> 04/22/2122
              </span>
            </div>
            <div className="text-normal text-cyan-900 pb-1">
              <span className="">
                <b>Time:</b> 1pm-3pm
              </span>
            </div>
            <div className="text-normal text-cyan-900 pb-1 hover:text-orange-300">
              <a href="">
                <span className="">
                  <i>More Information</i>
                </span>
              </a>
            </div>
            <div className="text-sm text-amber-500 md:absolute pt-3 md:pt-0 bottom-0 right-0">
              <button className="bg-cyan-700  hover:bg-orange-300 text-white font-bold py-2 px-4 rounded mt-1">
                Be Kind
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
