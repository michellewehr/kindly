import Comment from '../Comment';

export default function CommentsList({ comments }) {
  //  console.log(comments)
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          comment={comment}
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
