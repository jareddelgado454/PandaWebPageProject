export const getUserLocation = async() => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                resolve([ coords.longitude, coords.latitude ]);
            },
            ( err ) => {
                alert(`The website couldn't obtain your location.`);
                console.log(err);
                reject();
            }
        )
    });
}