export const CalculateAngleFromLocation = (startCoords, endCoords) => {
    const dx = endCoords[0] - startCoords[0];
    const dy = endCoords[1] - startCoords[1];
    const angleRadians = Math.atan2(dy, dx);
    const angleDegrees = angleRadians * (180 / Math.PI);

    return angleDegrees;
}