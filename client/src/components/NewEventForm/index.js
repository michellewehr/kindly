import { ADD_EVENT } from "../../utils/actions";
import { useSelector, useDispatch } from 'react-redux'

export default function NewEvent() {

  const state = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  const {
    _id,
    title,
    description,
    location,
    date,
    startTime,
    image,
    url
  } = event

  const { event } = state;

  return (
    <div>
      <form>
        <label>Title:</label>
        <input placeholder='Title' />
        <label>Location</label>
        <input placeholder='location' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

