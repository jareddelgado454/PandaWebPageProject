const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

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

exports.handler = async (event) => {
    const { lat, lon } = event.arguments;

    const params = {
        TableName: "Technician-yjp2laxn7fhihdb4oidvyc3hf4-dev"
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        const technicians = data.Items;

        const nearbyTechnicians = technicians.filter((technician) => {
            const distance = haversineDistance(
                { latitude: lat, longitude: lon },
                { latitude: technician.loLatitude, longitude: technician.loLongitude }
            );
            return distance <= 20 && technician.online_status === "online";
        });

        return nearbyTechnicians;
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener técnicos cercanos");
    }
};
