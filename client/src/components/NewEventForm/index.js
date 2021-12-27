import { useState } from "react";
import { useMutation } from "@apollo/client";
// import { ADD_REPLY } from "../../utils/mutations";

export default function newEventForm() {

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

