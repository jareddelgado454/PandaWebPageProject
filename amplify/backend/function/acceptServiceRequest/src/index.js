const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    const { serviceId, technicianSelectedId, destLatitude, destLongitude, price, statusService } = event.arguments;

    try {
        
        const updatedService = await updateService(serviceId, technicianSelectedId, destLatitude, destLongitude, price, statusService);
        await deleteOffersById(serviceId);

        return updatedService;
    } catch (error) {
        console.error(error);
        return error;
    }

};

const updateService = async (serviceId, technicianSelectedId, destLatitude, destLongitude, price, statusService) => {
    const params = {
        TableName: 'Service-yjp2laxn7fhihdb4oidvyc3hf4-dev',
        Key: { id: serviceId },
        UpdateExpression: 'SET serviceTechnicianSelectedId = :serviceTechnicianSelectedId, destLatitude = :destLatitude, destLongitude = :destLongitude, price = :price, #status = :statusService',
        ExpressionAttributeNames: {
            '#status': 'status'
        },
        ExpressionAttributeValues: {
            ':serviceTechnicianSelectedId': technicianSelectedId,
            ':destLatitude' : destLatitude,
            ":destLongitude" : destLongitude,
            ":price" : price,
            ":statusService" : statusService
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const result = await dynamoDB.update(params).promise();
        return result.Attributes;
    } catch (error) {
        console.error(`Error updating service: ${error.message}`);
        throw new Error('Failed to update service', error);
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