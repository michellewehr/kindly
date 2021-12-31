import { useState } from "react";
import logo from "../assets/images/logo.png";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";
//todo implement redux for state management

//
export default function Signup() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [createUser, { error }] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // error handling
    try {
      const { data } = await createUser({
        variables: { ...formState },
      });
      // authorization
      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-screen h-screen bg-cover bg-no-repeat bg-[url('https://www.charities.org/sites/default/files/styles/large/public/volunteers18-5b2fe1c9a474be0036f6a7b2.jpg?itok=HeETal1T')]">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto">
        <form className="space-y-6" action="#" onSubmit={handleFormSubmit}>
          <div className="text-xl font-medium text-gray-900 dark:text-white flex flex-row">
            <img
              className='fill-current h-12 w-14 mr-2" width="54" height="54" viewBox="0 0 54 54'
              src={logo}
            />
            <h2 className="text-4xl pl-2">Kindly Sign Up</h2>
          </div>
          <div>
            <label
              for="firstName"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              firstName
            </label>
            <input
              type=""
              name="firstName"
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="First Name"
              required=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              for="lasName"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Last Name
            </label>
            <input
              type=""
              name="lastName"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Smith"
              required=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              for="email"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@domain.com"
              required=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              for="password"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required=""
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full text-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-sky-100 dark:hover:bg-sky-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
