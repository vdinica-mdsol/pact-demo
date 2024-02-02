const { Verifier } = require('@pact-foundation/pact');
const { app } = require('./provider');

const port = '8000';
app.listen(port, () => console.log(`Listening on port ${port}...`));

// @TODO: setup pactflow account
const options = {
  provider: 'StudyGroupsAPI',
  providerBaseUrl: `http://localhost:${port}`,
  pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  providerVersion: '1.0.0',
  publishVerificationResult: true,
  consumerVersionTags: ['main'],
  stateHandlers: {},
};

const verifier = new Verifier(options);

describe('Pact Verification', () => {
  test('should validate the expectations of http consumer', () => {
    return verifier
      .verifyProvider()
      .then(output => {
        console.log('Pact Verification Complete: ', output);
        app.close();
      });
  });
});
