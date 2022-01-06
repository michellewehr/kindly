import Comment from '../Comment';

export default function CommentsList({ comments, eventId, goodDeedId }) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          comment={comment}
          eventId={eventId}
          goodDeedId={goodDeedId}
        />
      ))};
    </div>
  );
};
