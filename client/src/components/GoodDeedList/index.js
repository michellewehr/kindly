import GoodDeed from "../GoodDeed";
import { useEffect, useState } from "react";
import { QUERY_GOOD_DEEDS } from '../../utils/queries'
import { useQuery } from "@apollo/client";
import Auth from '../../utils/auth';
import GoodDeedModal from "../GoodDeedModal";

export default function GoodDeedList() {
  const { loading, data } = useQuery(QUERY_GOOD_DEEDS)
  const [goodDeedModalOpen, setGoodDeedModalOpen] = useState(false);

  const goodDeedData = data?.goodDeeds || [];
  // console.log(goodDeedData)


  return (
    <div>
      {goodDeedModalOpen && <GoodDeedModal onClose={() => { setGoodDeedModalOpen(false) }} />}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {Auth.loggedIn() && (
            <div className="relative h-16 text-sm text-amber-500">
              <button onClick={() => { setGoodDeedModalOpen(true) }} className="absolute right-0 h-16 px-4 py-2 mt-1 mr-2 font-bold text-white rounded bg-cyan-700 hover:bg-orange-300">
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
