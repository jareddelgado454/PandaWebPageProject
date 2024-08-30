import gql from "graphql-tag";

export const updateMyInformation = gql`
    mutation UpdateCustomer($input: UpdateCustomerInput!) {
        updateCustomer(input: $input){
            id
            email
        }
    }
`;

export const createService = gql`
    mutation CreateService($input: CreateServiceInput!) {
        createService(input: $input) {
            id
            description
            originLatitude
            originLongitude
            address
            status
            type
            customerId
            customer {
                id
                fullName
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
        updateService(input: {id: $serviceId, serviceTechnicianSelectedId: $serviceTechnicianSelectedId, price: $price, destLatitude: $destLatitude, destLongitude: $destLongitude, status: "service accepted"}){
            id
            originLatitude
            originLongitude
            status
            serviceTechnicianSelectedId
            customerId
            technicianSelected{
                id
                email
                fullName
                contactNumber
                profilePicture
                loLatitude
                loLongitude
            }
            car {
                id
                brand
                image
                model
                year
            }
            customer {
                id
                profilePicture
                fullName
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