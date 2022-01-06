import GoodDeed from "../GoodDeed";
import { useState } from "react";
import { QUERY_GOOD_DEEDS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import GoodDeedModal from "../GoodDeedModal";
import Loading from "../Loading";
import SuccessModal from "../SuccessModal";

export default function GoodDeedList({ me }) {
  const { loading, data } = useQuery(QUERY_GOOD_DEEDS);
  const [goodDeedModalOpen, setGoodDeedModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const goodDeedData = data?.goodDeeds || [];
  const userMeData = me || {};
  if (loading) return <Loading />;

  function onClose() {
    setGoodDeedModalOpen(false);
  }
  function onSubmitMod() {
    setShowSuccess(true);
  }

  return (
    <div>
      {showSuccess && (
        <SuccessModal
          message={"Good deed successfully added!"}
          closeSuccess={() => setShowSuccess(false)}
        />
      )}
      {goodDeedModalOpen && (
        <GoodDeedModal onClose={onClose} onSubmitMod={onSubmitMod} />
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {Auth.loggedIn() && (
            <div className="relative h-16 text-sm text-amber-500">
              <button
                onClick={() => {
                  setGoodDeedModalOpen(true);
                }}
                className="absolute top-0 right-0 h-16 px-4 py-2 mt-1 mr-2 font-bold text-black rounded bg-sky-100 hover:bg-orange-300"
              >
                Create Good Deed
              </button>
            </div>
          )}
          {goodDeedData.map((goodDeed) => (
            <GoodDeed
              key={goodDeed.title}
              goodDeedData={goodDeed}
              me={userMeData}
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
  );
}
