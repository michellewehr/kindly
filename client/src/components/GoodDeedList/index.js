import GoodDeed from "../GoodDeed";
import { useEffect, useState } from "react";
import {  QUERY_GOOD_DEEDS } from '../../utils/queries'
import { useQuery } from "@apollo/client";
import Auth from '../../utils/auth';
import GoodDeedModal from "../GoodDeedModal";

export default function GoodDeedList() {
  const { loading, data } = useQuery(QUERY_GOOD_DEEDS)
  const [goodDeedModalOpen, setGoodDeedModalOpen] = useState(false);

  const goodDeedData = data?.goodDeeds || [];
  console.log(goodDeedData)


  return (
    <div>
      {goodDeedModalOpen && <GoodDeedModal onClose={() => {setGoodDeedModalOpen(false)}}/>}   

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
            {Auth.loggedIn() && (
        <div className="text-sm text-amber-500 relative h-16">
        <button onClick={() => {setGoodDeedModalOpen(true)}} className="h-16 bg-cyan-700 hover:bg-orange-300 absolute right-0 mr-2 text-white font-bold py-2 px-4 rounded mt-1">
          Create Good Deed
        </button>
      </div>
        )}
          {goodDeedData.map((goodDeed) => (
            <GoodDeed
              key={goodDeed._id}
              goodDeed={goodDeed}
              // host={goodDeed.host}
              // title={goodDeed.title}
              // location={goodDeed.location}
              // comments={goodDeed.comments}
              // deedText={goodDeed.deedText}
              // helper={goodDeed.helper}
            />
          ))}
        </div>
      )}
    </div>
  )
}
