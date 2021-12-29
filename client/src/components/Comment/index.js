import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_COMMENT } from "../../utils/actions";


export default function Comment(comment) {
  // const state = useSelector((state) => {
  //   return state;
  // });

  // const dispatch = useDispatch();

  // const {
  //   author,
  //   commentText,
  //   createdAt,
  //   likes,
  //   replies,
  //   replyCount,
  // } = comment;

  // const {comment } = state;

  

  return (
    <section className="overflow-hidden text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="divide-y-2 divide-gray-100">
          <div className="flex flex-wrap py-8 md:flex-nowrap">
            <div className="flex flex-col flex-shrink-0 mb-6 md:w-64 md:mb-0">
              <span className="font-semibold text-gray-700 title-font">
                {/* get users name */}
                {/* {comment.author} */}
                Author
                {/* Author */}
                {/* this is where we would call the imported user name concat function */}
              </span>
              <span className="mt-1 text-sm text-gray-500">
                {/* get comment dateTime */}
                {/* {comment.createdAt} */}
              </span>
            </div>
            <div className="md:flex-grow">
              <p className="leading-relaxed">
                {/* get commentText */}
                {comment.commentText}
                {/* Glossier echo park pug, church-key sartorial biodiesel
                vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon
                party messenger bag selfies, poke vaporware kombucha
                lumbersexual pork belly polaroid hoodie portland craft beer. */}
              </p>
              <a className="inline-flex items-center mt-4 text-indigo-500">
                {/* get likeCount */}
                Likes: {comment.likes}
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
           
          </div>
        </div>
      </div>
       {/* Replies */}
       <div>
              <ul> Replies
            {comment.replies.map((reply) => (
            <li
              key={reply._id}
              _id={reply._id}
              replyBody={reply.commentText}
              // author={reply.author}
            > Singular Reply: {reply.replyBody} </li>
          ))}
          </ul>
            </div>
    </section>
  );
}
