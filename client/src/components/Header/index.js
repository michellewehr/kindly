import { Link } from "react-router-dom";
// import Auth from "../../utils/auth";
import logo from "../../assets/images/logo.png";

export default function Header() {

    // const logout = (event) => {
    //   event.preventDefault();
    //   Auth.logout();
    // };


  return (
    <div>
      <nav class="flex items-center justify-between flex-wrap bg-sky-100	 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <img
            class="fill-current h-18 w-10 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            src={logo}
          />
          <span class="font-semibold text-4xl tracking-tight text-cyan-900	">
            Kindly
          </span>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-orange-400 border-orange-400 hover:text-slate-400 hover:border-white">
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              class="block mt-4 lg:inline-block lg:mt-0 hover:text-slate-400 mr-4 text-sky-900 text-xl"
            >
              Log In
            </a>
            <a
              href="#responsive-header"
              class="block mt-4 lg:inline-block lg:mt-0 hover:text-slate-400 mr-4 text-sky-900 text-xl"
            >
              Sign Up
            </a>
          </div>
          <div></div>
        </div>
      </nav>
    </div>
  );
}
