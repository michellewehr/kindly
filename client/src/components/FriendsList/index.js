import { Link } from "react-router-dom";

export default function FriendsList({ friends, name }) {
  // if (!friends || friends.length) {
  //   return (
  //     <p className="noFriends">
  //       {name} has no friends yet.
  //     </p>
  //   )
  // }

  return (
    <div>
      {/* friend count? */}
      {/* <h5>
        {name}'s {friendCount} {friendCount === 1 ? "friend" : "friends"}
      </h5> */}
      {/* get friends */}
      {friends.map((friend) => (
        <button className="mb-2 btn w-100 display-block" key={friend._id}>
          <Link to={`/profile/${friend.name}`}>{friend.name}</Link>
        </button>
      ))}
    </div>
  );
}
