const AWS = require("aws-sdk");
const sns = new AWS.SNS();
const ses = new AWS.SES({ region: "us-east-1" });
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { differenceInMinutes } = require('date-fns');

const formatDateForScheduler = (date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

exports.handler = async (event) => {

  console.log('Called');

  try {
    
    const { serviceId } = event;

    if (!serviceId) {
      throw new Error("Service ID is missing in the event");
    }

    const serviceParams = {
      TableName: "ScheduledService-yjp2laxn7fhihdb4oidvyc3hf4-dev",
      Key: { id: serviceId },
    };
    const serviceData = await dynamodb.get(serviceParams).promise();

    if (!serviceData.Item) throw new Error("Service not found");
    
    const { title, scheduledStartDate, technicianOfferedId } = serviceData.Item;

    const minutes = differenceInMinutes(formatDateForScheduler(new Date(scheduledStartDate)), new Date());

    const params = {
        TableName: "Technician-yjp2laxn7fhihdb4oidvyc3hf4-dev", 
        Key: {
          id: technicianOfferedId, 
        },
    };

    const technician = await dynamodb.get(params).promise();
    console.log("Este es el tecnico", technician);
    if (!technician.Item || !technician.Item.fcmToken) {
        throw new Error("Customer or FCM token not found");
    }

    await sendEmailForScheduledService(technician.Item, minutes);

    const message = `Your scheduled service "${title}" is starting in ${minutes}`;

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

    const endpointArn = await createEndpoint(technician.Item.fcmToken);

    const snsParams = {
      Message: JSON.stringify(payload),
      MessageStructure: "json",
      TargetArn: endpointArn,
    };
    await sns.publish(snsParams).promise();

    return { statusCode: 200, body: "Notification sent successfully" };
  } catch (error) {
    console.error("Error sending notification:", error);
    return { statusCode: 500, body: `Failed to send notification: ${error.message}` };
  }
};

const createEndpoint = async (fcmToken) => {
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

const sendEmailForScheduledService = async (technician, minutes) => {
  try {
      const emailParams = {
          Destination: {
              ToAddresses: [technician.email],
          },
          Message: {
              Body: {
                  Text: {
                      Data: `Hi ${technician.fullName},\n\nYour scheduled service is starting in ${minutes} minutes.`
                  }
              },
              Subject: { Data: "Scheduled Service" }
          },
          Source: "reply@panda-mars.com"
      };
      
      await ses.sendEmail(emailParams).promise();
  } catch (error) {
      throw error;
  }
}