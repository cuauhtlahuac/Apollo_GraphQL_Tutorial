import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
// import gql from "graphql-tag";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/"
});
const client = new ApolloClient({
  cache,
  link
});

// previous variable declarations

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById("root")
);

// ... above is the instantiation of the client object.
// client
//   .query({
//     query: gql`
//       query GetLaunch {
//         launch(id: 56) {
//           id
//           mission {
//             name
//           }
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));
