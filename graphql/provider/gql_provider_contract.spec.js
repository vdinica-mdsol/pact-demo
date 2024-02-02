const { Verifier } = require('@pact-foundation/pact');

// @TODO: setup pactflow account
const options = {
  provider: 'GraphQLProvider',
  providerBaseUrl: `http://localhost:8080/graphql`,
  pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  providerVersion: '1.0.0',
  publishVerificationResult: true,
  consumerVersionTags: ['main'],
};

const verifier = new Verifier(options);

describe('Pact Verification', () => {
  test('should validate the expectations of GraphQLConsumer', () => {
    return verifier
      .verifyProvider()
      .then(output => {
        console.log('Pact Verification Complete: ', output);
      });
  });
});
