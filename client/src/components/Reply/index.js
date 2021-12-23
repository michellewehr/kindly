import { Link } from "react-router-dom";

export default function Reply({ replies }) {
  return (
    //todo needs Tailwind style
    <div className="">
      <div className="">
        <span className="">Replies</span>
      </div>
      <div className="card-body">
        {replies &&
          replies.map((reply) => (
            <p className="" key={reply._id}>
              {reply.replyText} {"// "}
              <Link
                to={`/profile/${reply.username}`}
                style={{ fontWeight: 700 }}
              >
                {reply.name} on {reply.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
}
