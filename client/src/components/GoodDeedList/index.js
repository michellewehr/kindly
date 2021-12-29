import GoodDeed from "../GoodDeed";
// import { useEffect } from "react";
import {  QUERY_GOOD_DEEDS } from '../../utils/queries'
import { useQuery } from "@apollo/client";
import Auth from '../../utils/auth';


export default function GoodDeedList() {
  const { loading, data } = useQuery(QUERY_GOOD_DEEDS)

  const goodDeedData = data?.goodDeeds || [];
  console.log(goodDeedData)

  // if (loading) {
  //   return (
  //     <div>
  //       Loading ...
  //     </div>
  //   )
  // }

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
            {Auth.loggedIn() && (
        <div className="text-sm text-amber-500 relative h-16">
        <button className="h-16 bg-cyan-700 hover:bg-orange-300 absolute right-0 mr-2 text-white font-bold py-2 px-4 rounded mt-1">
          Create Good Deed
        </button>
      </div>
        )}
          {goodDeedData.map((goodDeed) => (
            <GoodDeed
              key={goodDeed._id}
              _id={goodDeed._id}
              title={goodDeed.title}
              location={goodDeed.location}
              comments={goodDeed.comments}
              deedText={goodDeed.deedText}
              helper={goodDeed.helper}
            />
          ))}
        </div>
      )}
    </div>
  )
}
