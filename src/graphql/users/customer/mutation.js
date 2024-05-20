import gql from "graphql-tag";

export const createService = gql`
    mutation CreateService($input: CreateServiceInput!) {
        createService(input: $input) {
            id
            originLatitude
            originLongitude
            status
            type
            customer {
                id
                fullName
                email
                contactNumber
                profilePicture
            }
            car {
                id
                brand
                model
                year
            }
            createdAt
            updatedAt
        }
    }

`;

export const updateService = gql`
    mutation MyMutation($serviceId: ID!, $serviceTechnicianSelectedId: ID!, $price: Float!, $destLatitude: Float!, $destLongitude: Float!) {
        updateService(input: {id: $serviceId, serviceTechnicianSelectedId: $serviceTechnicianSelectedId, price: $price, destLatitude: $destLatitude, destLongitude: $destLongitude, type: "repair", status: "service accepted"}){
            id
            originLatitude
            originLongitude
            status
            serviceTechnicianSelectedId
            technicianSelected{
                id
                email
                fullName
                contactNumber
                profilePicture
            }
            destLatitude
            destLongitude
            type
            createdAt
            updatedAt
        }
    }
`;

export const saveMyCar = gql`
    mutation SaveCar($input: CreateCarInput!) {
    createCar(input: $input) {
        id
        brand
        image
        model
        year
        createdAt
    }
    }
`;

export const updateMyCar = gql`
    mutation UpdateCar($input: UpdateCarInput!) {
        updateCar(input: $input) {
            id
        }
    }
`;

export const deleteMyCar = gql`
    mutation DeleteCar($carId: ID!) {
        deleteCar(input: {id: $carId}){
            id
            customerCarsId
        }
    }

`;