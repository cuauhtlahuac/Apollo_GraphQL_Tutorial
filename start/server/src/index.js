const { ApolloServer } = require("apollo-server");
// Schema
const typeDefs = require("./schema");
// Database
const { createStore } = require("./utils");
// APIs
const LaunchAPI = require("./datasources/launch");
const UserAPI = require("./datasources/user");
// Resolvers
const resolvers = require("./resolvers");
// Authentication
const isEmail = require("isemail");

const store = createStore();

const server = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || "";
    const email = Buffer.from(auth, "base64").toString("ascii");
    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null };
    // find a user by their email
    const users = await store.users.findOrCreate({ where: { email } });
    const user = users && users[0] ? users[0] : null;
    return { user: { ...user.dataValues } };
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
  // engine: {
  //   apiKey: "service:cuauhtlahuac-599:1Q9ye2u-D0V5sv6pE5zQdg"
  //   }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
