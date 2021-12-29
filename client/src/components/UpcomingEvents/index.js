export default function UpcomingEvents() {
  return (
    <div>
      <div className="bg-sky-100 mx-auto text-center rounded w-9/12 mb-2">
        <h2 className="mb-1 underline">Upcoming Registered Events</h2>
        {/* div for each event */}
        <a className="bg-sky-100" href="">
          <div className="text-left px-1">
            {/* get upcoming event data */}
            <h3 className="bg-cyan-600 hover:bg-orange-300">Event Name</h3>
            <p>Location</p>
            <p>Date at Start Time- End Time</p>
          </div>
        </a>
        {/* end of div for each event */}
      </div>
    </div>
  );
}
