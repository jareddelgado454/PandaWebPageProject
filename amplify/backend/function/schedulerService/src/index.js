const AWS = require("aws-sdk");
const scheduler = new AWS.Scheduler();

exports.handler = async (event) => {
  try {
    for (const record of event.Records) {
      if (record.eventName === "INSERT" || record.eventName === "MODIFY") {
        const newImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);

        if (newImage.scheduledStartDate) {
          await scheduleNotification(newImage);
        }
      }
    }
    return { statusCode: 200, body: "Notifications scheduled successfully" };
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