const AWS = require("aws-sdk");
const scheduler = new AWS.Scheduler();
const sns = new AWS.SNS();

exports.handler = async (event) => {
  try {
    for (const record of event.Records) {
      if (record.eventName === "MODIFY") {
        const newImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);

        if (newImage.offerStatus === "accepted") {
          await handleAcceptNotification(newImage);
        }

        if (newImage.scheduledStartDate && newImage.scheduledServiceTechnicianSelectedId) {
          await scheduleNotification(newImage);
        }
      }

      if (record.eventName === "REMOVE") {
        const oldImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);
        if (oldImage) {
          await handleDeleteNotification(oldImage);
        }
      }
    }
    return { statusCode: 200, body: "Event processed successfully" };
  } catch (error) {
    console.error("Error processing DynamoDB Stream:", error);
    return { statusCode: 500, body: `Error: ${error.message}` };
  }
};

const formatDateForScheduler = (date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mes comienza en 0
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};


const scheduleNotification = async (service) => {

  const { id, scheduledStartDate } = service;

  const formattedScheduledStartDate = formatDateForScheduler(new Date(scheduledStartDate));

  const notificationTime = new Date(new Date(formattedScheduledStartDate).getTime() - 15 * 60000);

  const now = new Date();
  if (notificationTime.getTime() <= now.getTime() + 60000) {
    console.error(`Notification time ${notificationTime} is too close or in the past.`);
    return;
  }
  const notificationTimeUTC = formatDateForScheduler(new Date(notificationTime));
  
  const scheduleExpression = `at(${notificationTimeUTC})`;

  const scheduleName = `notify-service-${id}`;
  console.log(scheduleName);
  const roleArn = "arn:aws:iam::327537917845:role/pandawebappLambdaRole0cb4f451-dev";

  const params = {
    Name: scheduleName,
    ScheduleExpression: scheduleExpression,
    Target: {
      Arn: "arn:aws:lambda:us-east-1:327537917845:function:notifyScheduledService-dev",
      RoleArn: roleArn,
      Input: JSON.stringify({ serviceId: id }),
    },
    FlexibleTimeWindow: {
      Mode: "OFF",
    },
    ActionAfterCompletion: "DELETE"
  };

  try {
    await scheduler.createSchedule(params).promise();
  } catch (error) {
    console.error(`Error creating schedule for service ${id}:`, error);
  }
};

const handleAcceptNotification = async (service) => {
  try {
    const { id, customer, title } = service;

    if (!id) {
      throw new Error("Service ID is missing in the event");
    }

    if (!customer || !customer.fcmToken) {
      throw new Error("Customer or FCM token not found");
    }

    const message = `Your scheduled service ${title} petition has been accepted.`;
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
};

const handleDeleteNotification = async (service) => {
  try {
    const { id, customer } = service;

    if (!id) {
      throw new Error("Service ID is missing in the event");
    }

    if (!customer || !customer.fcmToken) {
      throw new Error("Customer or FCM token not found");
    }

    const message = `Your scheduled service petition has been rejected.`;
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
