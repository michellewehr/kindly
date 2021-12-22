import FriendsList from "../FriendsList";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div class="flex flex-col bg-cyan-700 w-1/4">
        {/* div for the profile picture and name */}
        <div class="flex content-center	">
          <div class="w-2/4 pt-2 mx-auto">
            <img
              class="rounded-lg shadow-lg antialiased"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            />
          </div>
        </div>
        {/* end of profile pic */}
        {/* div for name */}
        <h1 class="text-sky-100 text-2xl text-center p-1">Michelle Wehr</h1>
        {/* div for name end */}
        {/* points */}
        <div class="flex flex-row mx-auto ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="orange"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p class="text-white pb-1">10 Earned Kindly Points</p>
        </div>
        {/* end of points */}
        {/* location */}
        <div class="">
          <p class="bg-orange-300 mx-auto text-center rounded w-2/4 mb-2">
            Tolland, CT
          </p>
        </div>
        {/* end of location */}
        {/* friends */}
        <div class="bg-sky-100 mx-auto text-center rounded w-9/12 mb-2 h-32 overflow-scroll	">
          <FriendsList />
        </div>
        {/* end of friends */}
        {/* Upcoming Events */}
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
          {/* div for each event */}
          <a class="" href="">
            <div class="text-left px-1 mb-2">
              <h3 class="bg-cyan-600 hover:bg-orange-300">Event Name</h3>
              <p>Location</p>
              <p>Date at Start Time- End Time</p>
            </div>
          </a>
          {/* end of div for each event */}
        </div>
        {/* End of upcoming events */}
        <div class="bg-sky-100 mx-auto text-center rounded w-9/12 mb-2">
          <h2 class="mb-1 underline">Good Deads</h2>
          {/* div for good deeds */}
          <a class="" href="">
            <div class="text-left px-1">
              <h3 class="bg-cyan-600 hover:bg-orange-300">Help Neighbor</h3>
              <p>Tolland, CT</p>
            </div>
          </a>
          {/* end of div for good deeds */}
          {/* div for good deeds */}
          <a class="" href="">
            <div class="text-left px-1">
              <h3 class="bg-cyan-600 hover:bg-orange-300">Help Neighbor</h3>
              <p>Tolland, CT</p>
            </div>
          </a>
          {/* end of div for good deeds */}
        </div>
        {/* div for my postings */}
        {/* end of div for my postings */}
        {/* view my profile */}
        <a href="">
          <p class="text-sky-100 text-xl text-center pt-3 hover:text-orange-300">
            View My Full Profile
          </p>
        </a>
        {/* end of view my profile */}
      </div>
    </div>
  );
}
