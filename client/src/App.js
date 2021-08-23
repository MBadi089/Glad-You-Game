import React from 'react';
// import SearchGames from './pages/SearchGames';
// import SavedGames from './pages/SavedGames';
import Navbar from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Login from './components/Login';
import Nav from './components/Nav';
import Signup from './components/Signup';

// establish a new link to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql'
});

// login authorization
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// instantiate the Apollo Client instance
const client = new ApolloClient({
  // create the connection to the API endpoint
  link: authLink.concat(httpLink),
  // instantiate a new cache object
  cache: new InMemoryCache()
});

function App() {
  return (
    <div>
      <Nav />
    <ApolloProvider client={client}>
      <Router>
      <>
        <Navbar />
        {/* <Switch>
          <Route exact path='/' component={SearchGames} />
          <Route exact path='/saved' component={SavedGames} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch> */}
      </>
      </Router>
    </ApolloProvider>
    </div>
  );
}

export default App;
