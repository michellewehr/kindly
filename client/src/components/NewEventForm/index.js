import { ADD_EVENT } from "../../utils/actions";
import { useSelector, useDispatch } from 'react-redux'

export default function NewEvent() {

  const dispatch = useDispatch();

  const {
    title,
    description,
    location,
    date,
    startTime,
    endTime,
    url,
    } = useSelector(state => state.newEvent);

    const { newEvent } = dispatch;


    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch({
        type: ADD_EVENT,
        payload: {
          title: title,
          description: description,
          location: location,
          date: date,
          startTime: startTime,
          endTime: endTime,
          url: url,
        }
      });
    }
    // const onChange = (event) => {
    //   const { name, value } = event.target;
    //   newEvent({
    //     type: 'newEvent',
    //     payload: {
    //       [name]: value
    //     }
    //   });
    // }


    return (
      <div className="flex flex-col w-full p-3 mt-2 antialiased bg-white rounded-lg shadow-lg">
        <div className="flex flex-row flex-wrap w-full px-3 md:w-2/3">
          <div className="relative w-full pt-3 font-semibold text-left text-gray-700 md:pt-0">
            <div className="flex flex-row pb-1 text-2xl leading-tight text-amber-500">
              <form onSubmit={handleSubmit}>
                <input
                  className="w-full p-3 rounded-lg shadow-lg"
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  value={title}
                  onChange={e => newEvent({ ...newEvent, title: e.target.value })}
                />
                <input
                  className="w-full p-3 rounded-lg shadow-lg"
                  type="text"
                  name="description"
                  placeholder="Event Description"
                  value={description}
                  onChange={e => newEvent({ ...newEvent, description: e.target.value })}
                />
                <input
                  className="w-full p-3 rounded-lg shadow-lg"
                  type="text"
                  name="location"
                  placeholder="Event Location"
                  value={location}
                  onChange={e => newEvent({ ...newEvent, location: e.target.value })}
                />
                <input
                  className="w-full p-3 rounded-lg shadow-lg"
                  type="date"
                  name="date"
                  placeholder="Event Date"
                  value={date}
                  onChange={e => newEvent({ ...newEvent, date: e.target.value })}
                />
                <input
                  className="w-full p-3 rounded-lg shadow-lg"
                  type="time"
                  name="startTime"
                  placeholder="Event Start Time"
                  value={startTime}
                  onChange={e => newEvent({ ...newEvent, startTime: e.target.value })}
                />
                <input
                  className="w-full p-3 rounded-lg shadow-lg"
                  type="time"
                  name="endTime"
                  placeholder="Event End Time"
                  value={endTime}
                  onChange={e => newEvent({ ...newEvent, endTime: e.target.value })}
                />
                <input
                  className="w-full p-3 rounded-lg shadow-lg"
                  type="text"
                  name="url"
                  placeholder="Event URL"
                  value={url}
                  onChange={e => newEvent({ ...newEvent, url: e.target.value })}
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
