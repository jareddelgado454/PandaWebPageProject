const AWS = require("aws-sdk");
const sns = new AWS.SNS();

const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
     try {
        for (const record of event.Records) {
          console.log(record);
          if (record.eventName === "INSERT") {
            const newImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
    
            console.log("Es un inseeeeeeeeeert");

            if (newImage.technicianOfferedId && newImage.offerStatus === "pending") {
              console.log("Ejecutandoi la funcion sendServiceStatusNotification");
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
      const { id, technicianOfferedId, status } = service;
      if (!id) {
        throw new Error("Service ID is missing in the event");
      }
      if (!technicianOfferedId ) {
        throw new Error("Technician not found");
      }

      const message = `A new scheduled service has been created`;
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
      console.log("Este es el ID: "+service.technicianOfferedId);
      const params = {
        TableName: "Technician-yjp2laxn7fhihdb4oidvyc3hf4-dev", 
        Key: {
          id: service.technicianOfferedId, 
        },
      };

      const technician = await dynamoDB.get(params).promise();

      console.log("Este es el tecnico aqui en la lambda", technician);

      if(!technician){
        return {
          statusCode: 500,
          body: `Technician not found}`,
        };
      }

      console.log(`Token: ${technician.Item.fcmToken}`)
      
      const endpointArn = await createEndpoint(technician.Item.fcmToken);
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
  console.log(`Token dentro de createEndpoint: ${fcmToken}`);
  const params = {
    PlatformApplicationArn: "arn:aws:sns:us-east-1:327537917845:app/GCM/Panda-Customer",
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