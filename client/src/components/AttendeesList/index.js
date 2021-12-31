import { Link } from "react-router-dom";

export default function AttendeesList({attendees}) {
    console.log(attendees, 'list')
    console.log(attendees[0].firstName, 'firstname')
    for(let i =0; i < attendees.length; i++) {
        console.log(attendees[i].firstName);
    }
    return (
        // <div>
        //     <ul>
        //         {attendees.map((attendee) => {
        //             <li key={attendee._id}>
        //                 <Link to={`/profile/${attendee._id}`}>{attendee.firstName} {attendee.lastName} </Link>
        //             </li>
        //         })}
        //     </ul>
        // </div>
        <ul>
            {attendees.map((attendee) => (
                  <li key={attendee._id} className="">
                      <Link
                        to={`/profile/${attendee._id}`}
                        style={{ fontWeight: 700 }}
                      >{attendee.firstName} {attendee.lastName}
                      </Link>
                  </li>
                ))}
        </ul>
    )
}