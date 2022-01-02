import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import store from './utils/store';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import UserProfile from './pages/UserProfile';
import { Provider } from 'react-redux'

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='relative h-100'>
          <Provider store={store}>
            <Nav />
            <div className='min-h-full'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/myprofile" element={<Profile />} />
                <Route exact path="/profile/:id" element={<UserProfile/>} />
              </Routes>
            </div>
            <Footer />
          </Provider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
