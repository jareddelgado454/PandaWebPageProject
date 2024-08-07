import { Geo } from "@aws-amplify/geo";
export const retrieveAddressUsingLocation = async(longitude, latitude) => {
    const response = await Geo.searchByCoordinates([longitude, latitude])
    if (response) {
      const addressArray = response.label;
      const newAddres = addressArray?.split(",").slice(0, addressArray.split(",").length - 2).toString();
      return newAddres;
    }
}