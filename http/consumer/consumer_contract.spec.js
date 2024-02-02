const path = require('path');
const { fetchStudyGroups } = require('./service');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');

// initialize pact provider
const pactProvider = new PactV3({
  dir: path.resolve(process.cwd(), 'pacts'), // directory where pacts will live
  consumer: 'HttpConsumer', // consumer name
  provider: 'StudyGroupsAPI', // provider name
});

describe('HttpConsumer service', () => {
  describe('When a GET request is made to /studyGroups', () => {
    it('should return a list of all study groups', async () => {
      const expectedBody = [
        { id: 1, name: 'Pharma Bayern' },
      ];

      // setup the interactions
      pactProvider
        .uponReceiving('a request to get all study groups')
        .withRequest({
          method: 'GET',
          path: '/studyGroups',
        })
        .willRespondWith({
          status: 200,
          body: MatchersV3.eachLike(expectedBody[0]), // each item in response body must have "id" and "name" properties
        });

      // mock the provider API
      // and output pacts to pacts directory
      await pactProvider.executeTest(async (mockProvider) => {
        const studyGroups = await fetchStudyGroups(mockProvider.url);
        expect(studyGroups).toEqual(expectedBody);
      });
    });
  });
});
