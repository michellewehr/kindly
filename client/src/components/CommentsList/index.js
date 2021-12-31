import Comment from '../Comment';

export default function CommentsList({ comments, eventId, goodDeedId }) {
  //  console.log(comments)
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          eventId={eventId}
          goodDeedId={goodDeedId}
        // _id={comment._id}
        // commentText={comment.commentText}
        // likes={comment.likes}
        // replies={comment.replies}
        // author={comment.author}
        />
      ))}
    </div>
  )
}