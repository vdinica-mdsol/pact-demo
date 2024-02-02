const path = require('path');
const { Verifier } = require('@pact-foundation/pact');
const { start } = require('./server');

// @TODO: maybe setup pactflow account
const options = {
  provider: 'StudyGroupsAPI',
  providerBaseUrl: 'http://localhost:8000',
  disableSSLVerification: true,
  pactUrls: [
    path.resolve(process.cwd(), 'pacts', 'HttpConsumer-StudyGroupsAPI.json'),
  ],
  providerVersion: '1.0.0',
  publishVerificationResult: true,
  consumerVersionTags: ['main'],
  stateHandlers: {},
};

describe('Pact Verification', () => {
  let verifier;
  let server;

  beforeAll(() => {
    server = start();
    verifier = new Verifier(options);
  });

  afterAll(() => {
    server.close();
  });

  it('should validate the expectations of http consumer', () => {
    return verifier
      .verifyProvider()
      .then(output => {
        console.log('Pact Verification Complete: ', output);
      });
  });
});
