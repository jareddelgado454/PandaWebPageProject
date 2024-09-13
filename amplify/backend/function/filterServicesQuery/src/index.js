/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { lat, lon } = event.arguments;

    const haversineDistance = (coords1, coords2) => {
        const toRad = (x) => (x * Math.PI) / 180;
        const R = 3960;
        const dLat = toRad(coords2.latitude - coords1.latitude);
        const dLon = toRad(coords2.longitude - coords1.longitude);
        const lat1 = toRad(coords1.latitude);
        const lat2 = toRad(coords2.latitude);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    try {
        const params = {
            TableName: "Service-yjp2laxn7fhihdb4oidvyc3hf4-dev",
        };

        const data = await dynamoDb.scan(params).promise();

        const technicianCoords = { latitude: lat, longitude: lon };
        const filteredServices = data.Items.filter((service) => {
            const serviceCoords = {
                latitude: parseFloat(service.originLatitude),
                longitude: parseFloat(service.originLongitude),
            };

            const distance = haversineDistance(technicianCoords, serviceCoords);
            return distance <= 50;
        });

        console.log("Estos son los servicios filtrados", filteredServices);

        return filteredServices;

    } catch (error) {
        console.error('Error:', error);
        return [] ;
    }
};