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
        {
          replies.map((reply) => (
            <div key={reply._id} className="">
              <p className="" >
                {reply.replyBody} </p>
                <Link
                  to={`/profile/${reply.author}`}
                  style={{ fontWeight: 700 }}
                >Get Author on get created at{reply.createdAt}
                </Link>
              
            </div>
          ))}
      </div>
    </div>
  );
}
