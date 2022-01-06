import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import UserProfile from "./pages/UserProfile";
import EventLink from "./components/EventLink";
import GoodDeedLink from "./components/GoodDeedLink";
import Landing from "./pages/Landing";

const httpLink = createHttpLink({
  uri: "https://kindly-volunteer.herokuapp.com/",
});

const authLink = setContext((__, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="relative h-100">
          <Nav />
          <div className="min-h-full">
            <Routes>
              <Route path="/landing" element={<Landing />} />
              <Route path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/myprofile" element={<Profile />} />
              <Route exact path="/profile/:id" element={<UserProfile />} />
              <Route exact path="/event/:id" element={<EventLink />} />
              <Route exact path="/gooddeed/:id" element={<GoodDeedLink />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
