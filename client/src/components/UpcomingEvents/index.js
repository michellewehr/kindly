export default function UpcomingEvents() {
  return (
    <div>
      <div className="w-9/12 mx-auto mb-2 text-center rounded bg-sky-100">
        <h2 className="mb-1 underline">Upcoming Registered Events</h2>
        {/* div for each event */}
        <a className="bg-sky-100" href="">
          <div className="px-1 text-left">
            <h3 className="bg-cyan-600 hover:bg-orange-300">Event Name</h3>
            <p>Location</p>
            <p>Date at Start Time- End Time</p>
          </div>
        </a>
      </div>
    </div>
  );
};
