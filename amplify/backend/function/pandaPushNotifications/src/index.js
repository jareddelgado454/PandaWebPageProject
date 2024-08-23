const AWS = require("aws-sdk");
const sns = new AWS.SNS();

exports.handler = async (event) => {
  const requestBody =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  const { title, message, fcmToken } = requestBody;
  try {
    const endpointArn = await createEndpoint(fcmToken);

    const payload = {
      default: message,
      GCM: JSON.stringify({
        notification: {
          title: title,
          body: message,
          sound: "default",
        },
      }),
    };

    const params = {
      Message: JSON.stringify(payload),
      MessageStructure: "json",
      TargetArn: endpointArn,
    };

    const result = await sns.publish(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Notification sent successfully",
        data: payload,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(`Failed to send notification: ${error.message}`),
    };
  }
};

const createEndpoint = async (fcmToken) => {
  const params = {
    PlatformApplicationArn:
      "arn:aws:sns:us-east-1:327537917845:app/GCM/Panda-Customer",
    Token: fcmToken,
  };

  try {
    const response = await sns.createPlatformEndpoint(params).promise();
    return response.EndpointArn;
  } catch (error) {
    console.error("Error creating endpoint:", error);
    throw error;
  }
};
