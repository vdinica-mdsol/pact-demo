const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { RESTDataSource } = require('@apollo/datasource-rest');
const gql = require('graphql-tag');

const typeDefs = gql`
  type StudyGroup {
    id: Int
    name: String
  }

  type Query {
    studyGroups: [StudyGroup]
  }
`;

class StudyGroupDataSource extends RESTDataSource {
  baseURL = 'http://localhost:8000';

  async getStudyGroups() {
    return this.get('/studyGroups');
  }
}

const resolvers = {
  Query: {
    studyGroups: (root, args, { dataSources }) => {
      return dataSources.studyGroups.getStudyGroups();
    },
  },
}

async function start() {
  const studyGroupsDS = new StudyGroupDataSource();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
          studyGroups: new studyGroupsDS,
        },
      };
    }
  });

  console.log(`GraphQL server is running at ${url}`);
};

start();
