


export default function UpcomingEvents() {
  return (
    <div>
      <div class="bg-sky-100 mx-auto text-center rounded w-9/12 mb-2">
        <h2 class="mb-1 underline">Upcoming Registered Events</h2>
        {/* div for each event */}
        <a class="bg-sky-100" href="">
          <div class="text-left px-1">
            <h3 class="bg-cyan-600 hover:bg-orange-300">Event Name</h3>
            <p>Location</p>
            <p>Date at Start Time- End Time</p>
          </div>
        </a>
        {/* end of div for each event */}
        
      </div>
    </div>
  );
}

