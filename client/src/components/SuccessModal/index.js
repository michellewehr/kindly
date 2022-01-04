import Loading from "../Loading";

export function SuccessModal({ onClose }) {
  <div
    class="fixed z-10 inset-0 overflow-y-auto w-full"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-end justify-center w-full min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>
      <div>Submission received!</div>
      <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
        <div class="mt-5 sm:mt-6">
          <button
            onClick={onClose}
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>;
}
