const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
    try {
        const secretName = "Location_Services_Key";
        
        const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
        
        let secret;
        if (data.SecretString) {
            secret = JSON.parse(data.SecretString);
        }

        const locationServicesKey = secret.Location_Services_Key;

        console.log('Secret retrieved:', locationServicesKey);

        return locationServicesKey;
    } catch (error) {
        console.error('Error retrieving secret:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to retrieve secret", error }),
        };
    }
};
