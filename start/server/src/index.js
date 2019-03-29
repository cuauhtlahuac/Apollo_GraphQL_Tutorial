const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
// Database
// const { createStore } = require("./utils");
// APIs
// const LaunchAPI = require("./datasources/launch");
// const UserAPI = require("./datasources/user");
// Resolvers
const resolvers = require("./resolvers");

// const server = new ApolloServer({ typeDefs });

// const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
