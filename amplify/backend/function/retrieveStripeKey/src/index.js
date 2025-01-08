const {
    SecretsManagerClient,
    GetSecretValueCommand,
  } = require("@aws-sdk/client-secrets-manager");
exports.handler = async (event) => {
    try {
        const key = await retrieveKeyFromSM();
        return key;
    } catch (ex) {
        throw new Error(ex);
    }
};

const retrieveKeyFromSM = async() => {
  try {
    const secret_name = "STRIPE_TEST_KEY";
    const clientSecrets = new SecretsManagerClient({
      region: "us-east-1",
    });

    const response = await clientSecrets.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", 
      })
    );

    const secret = JSON.parse(response.SecretString); 

    return secret;
  } catch (error) {
    throw new Error('Could not retrieve Stripe secret key');
  }
    
}