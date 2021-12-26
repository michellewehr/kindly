export default function CommentList() {
  return (
    <section className="overflow-hidden text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
          <div className="flex flex-wrap py-8 md:flex-nowrap">
            <div className="flex flex-col flex-shrink-0 mb-6 md:w-64 md:mb-0">
              <span className="font-semibold text-gray-700 title-font">
                {/* get users name */}
                {/* this is where we would call the imported user name concat function */}
              </span>
              <span
                className="mt-1 text-sm text-gray-500">
                {/* get comment dateTime */}
                {/* {comment.createdAt} */}
              </span>
            </div>
            <div className="md:flex-grow">
              <p className="leading-relaxed">
                {/* get commentText */}
                Glossier echo park pug, church-key sartorial
                biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3
                wolf moon party messenger bag selfies, poke vaporware kombucha
                lumbersexual pork belly polaroid hoodie portland craft beer.
              </p>
              <a className="inline-flex items-center mt-4 text-indigo-500">
                {/* get likeCount */}
                Like
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
    </section>
  );
}
