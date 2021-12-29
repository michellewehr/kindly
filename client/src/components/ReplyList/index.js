import { Link } from "react-router-dom";

export default function ReplyList({ replies }) {
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
            <div className="">
              <p className="" key={reply._id}>
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
