const AWS = require("aws-sdk");
const sns = new AWS.SNS();

exports.handler = async (event) => {

  try {
    for (const record of event.Records) {
      if (record.eventName === "MODIFY") {
        const newImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);

        if (newImage.customer.fcmToken && newImage.status !== "pending") {
          await sendServiceStatusNotification(newImage);
        }
      }
    }
    return { statusCode: 200, body: "Event processed successfully" };
  } catch (error) {
    console.error("Error processing DynamoDB Stream:", error);
    return { statusCode: 500, body: `Error: ${error.message}` };
  }

};

const sendServiceStatusNotification = async(service) => {

  try {
    const { id, customer, status } = service;

    if (!id) {
      throw new Error("Service ID is missing in the event");
    }

    if (!customer || !customer.fcmToken) {
      throw new Error("Customer or FCM token not found");
    }

    const message = `The service has changed to ${status}`;
    const payload = {
      default: message,
      GCM: JSON.stringify({
        notification: {
          title: "Scheduled Service",
          body: message,
          sound: "default",
        },
      }),
    };

    const endpointArn = await createEndpoint(customer.fcmToken);

    const snsParams = {
      Message: JSON.stringify(payload),
      MessageStructure: "json",
      TargetArn: endpointArn,
    };
    await sns.publish(snsParams).promise();

    console.log(`Notification sent to customer for service ${id}`);
    return { statusCode: 200, body: "Notification sent successfully" };
  } catch (error) {
    console.error("Error sending notification:", error);
    return {
      statusCode: 500,
      body: `Failed to send notification: ${error.message}`,
    };
  }

}

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
