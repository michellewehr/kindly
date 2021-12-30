import { Link } from "react-router-dom";

export default function ReplyList({ replies }) {
  // console.log(replies.author.firstName, 'reply list atuhor')
  return (
    //todo needs Tailwind style
    <div className="bg-sky-200">
      <div className="">
        <span className="">Replies</span>
      </div>
      {/* //! get reply data */}
      <div className="card-body">
        {replies &&
          replies.map((reply) => (
            <div key={reply._id} className="">
              <p className="" >
                {reply.replyBody} </p>
                <Link
                  to={`/profile/${reply.author}`}
                  // Get author but breaks because seeds
                  style={{ fontWeight: 700 }}
                >
                  {/* add createdAt in query- may break bc seeds right now */}
                 on {reply.createdAt}
                </Link>
              
            </div>
          ))}
      </div>
    </div>
  );
}
