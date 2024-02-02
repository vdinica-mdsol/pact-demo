const path = require('path');
const { getStudyGroups } = require('./client.js')
const { Pact, GraphQLInteraction, Matchers } = require('@pact-foundation/pact');

const pactProvider = new Pact({
  port: 8080,
  dir: path.resolve(process.cwd(), 'pacts'),
  consumer: 'GraphQLConsumer',
  provider: 'GraphQLProvider',
});

describe('GraphQL client', () => {
  // setup the provider
  beforeAll(() => pactProvider.setup());

  // generate pact (contract) when all tests done
  afterAll(() => pactProvider.finalize());

  // verify the consumer expectations
  // that is if all interactions have been exercised
  afterEach(() => pactProvider.verify());

  describe('When a query to list all study groups on /graphql is made', () => {
    const expectedBody = [
      { id: 1, name: 'Pharma Bayern' },
    ];

    beforeAll(async () => {
      // setup the graphql interaction
      const graphqlQuery = new GraphQLInteraction()
        .uponReceiving('a movies request')
        .withQuery(
          `
          query StudyGroupsQuery {
            studyGroups {
              id
              name
            }
          }
        `
        )
        .withOperation('StudyGroupsQuery')
        .withVariables({})
        .withRequest({
          method: 'POST',
          path: '/graphql',
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            data: {
              studyGroups: Matchers.eachLike(expectedBody[0]),
            },
          },
        });

      await pactProvider.addInteraction(graphqlQuery);
    });

    it('should correctly return a list of study groups', async () => {
      const res = await getStudyGroups();
      expect(res.studyGroups).toEqual(expectedBody);
    });
  });
});
