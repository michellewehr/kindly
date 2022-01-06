import EventCard from "../EventCard";
import { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import EventModal from "../EventModal";
import Comment from "../Comment";
import SuccessModal from "../SuccessModal";

export default function EventList({ events, me }) {
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const userMeData = me || {};

  function onClose() {
    setEventModalOpen(false);
  }
  function showSuccessMod() {
    setShowSuccess(true);
  }
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {eventModalOpen && (
          <EventModal onClose={onClose} showSuccessMod={showSuccessMod} />
        )}

        <div>
          <div>
            {showSuccess && (
              <SuccessModal
                message={"Event Successfully Added!"}
                closeSuccess={() => setShowSuccess(false)}
              />
            )}
            {Auth.loggedIn() && (
              <div className="relative h-16 text-sm text-amber-500">
                <button
                  onClick={() => {
                    setEventModalOpen(true);
                  }}
                  className="absolute right-0 h-16 px-4 py-2 mt-1 mr-2 font-bold text-black rounded bg-sky-100 hover:bg-orange-300"
                >
                  Create Event
                </button>
              </div>
            )}
            {events &&
              events.map((event) => (
                <div key={event.title}>
                  <EventCard event={event} me={userMeData} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
