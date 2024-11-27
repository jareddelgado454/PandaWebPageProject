const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    const { serviceId } = event.arguments;

    try {
        await deleteOffersById(serviceId);

        return serviceId;
    } catch (error) {
        console.error(error);
        return error;
    }

};

const deleteOffersById = async (serviceId) => {
    const queryParams = {
        TableName: 'Offer-yjp2laxn7fhihdb4oidvyc3hf4-dev',
        IndexName: 'byOffer',
        KeyConditionExpression: 'serviceId = :serviceId',
        ExpressionAttributeValues: {
            ':serviceId': serviceId
        }
    };

    try {
        const offersData = await dynamoDB.query(queryParams).promise();

        const deletePromises = offersData.Items.map((item) => {
            const deleteParams = {
                TableName: 'Offer-yjp2laxn7fhihdb4oidvyc3hf4-dev',
                Key: { id: item.id }
            };
            return dynamoDB.delete(deleteParams).promise();
        });

        await Promise.all(deletePromises);
    } catch (error) {
        console.error(`Error deleting offers: ${error.message}`);
        throw new Error('Failed to delete offers');
    }
};