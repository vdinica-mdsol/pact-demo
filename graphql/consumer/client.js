const { ApolloClient, InMemoryCache, gql, HttpLink } = require('@apollo/client');

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link: new HttpLink({
    fetch: require('node-fetch'),
    uri: 'http://127.0.0.1:8080/graphql',
  }),
});

const getStudyGroups = async () => {
  const response = await client
    .query({
      query: gql`
        query StudyGroupsQuery {
          studyGroups {
            id
            name
          }
        }
      `,
    });
  const { data } = response;

  return data;
};

module.exports = {
  getStudyGroups,
};
