import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

import logo from "../assets/images/logo.png";



export default function Login() {
  //! update state management to redux
    // const [formState, setFormState] = useState({ email: "", password: "" });
    // const [login, { error }] = useMutation(LOGIN_USER);

    // // update state based on form input changes
    // const handleChange = (event) => {
    //   const { name, value } = event.target;

    //   setFormState({
    //     ...formState,
    //     [name]: value,
    //   });
    // };

    // // submit form
    // const handleFormSubmit = async (event) => {
    //   event.preventDefault();

    //   try {
    //     const { data } = await login({
    //       variables: { ...formState },
    //     });

    //     Auth.login(data.login.token);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // };

  return (
    
    <div>
      <div class="w-screen h-screen bg-cover bg-no-repeat bg-[url('https://images.unsplash.com/photo-1593113616828-6f22bca04804?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80')]">
        <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto">
          <form class="space-y-6" action="#">
            <div class="text-xl font-medium text-gray-900 dark:text-white flex flex-row">
              <img
                class='fill-current h-12 w-14 mr-2" width="54" height="54" viewBox="0 0 54 54'
                src={logo}
              />
              <h2 class="text-4xl pl-2">Kindly Log In</h2>
            </div>
            <div>
              <label
                for="email"
                class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required=""
              />
            </div>
            //! code onclick management
            <button
              type="submit"
              class="w-full text-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-sky-100 dark:hover:bg-sky-700"
            >
              Log In
            </button>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <a
                href="#"
                class="text-blue-700 hover:underline dark:text-sky-700"
              >
                Create account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
