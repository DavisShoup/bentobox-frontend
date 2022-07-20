import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import NotFound from './pages/NotFound'


// Eliminates the cache data from being lost with the apollo client, created a merge function so that InMemoryCache can safely merge
const cache = new InMemoryCache({
  typePolicies: {
      Query: {
          fields: {
              chefs:{
                  merge(existing, incoming){
                      return incoming;
                  },
              },
              recipes:{
                  merge(existing, incoming){
                      return incoming;
                  },
              },
          }
      }
  }
})

const client = new ApolloClient({
  uri: 'https://bentobox-backend.herokuapp.com/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
        <Header />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/recipes/:id' element={<Recipe />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
