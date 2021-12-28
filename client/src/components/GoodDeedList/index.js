import GoodDeed from "../GoodDeed";
// import { useEffect } from "react";
import {  QUERY_GOOD_DEEDS } from '../../utils/queries'
import { useQuery } from "@apollo/client";

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
