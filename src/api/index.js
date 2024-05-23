import { client } from '@/contexts/AmplifyContext';
import { getUserByCognitoID, getUserByEmail } from '@/graphql/custom-queries';
import { createOffer, updateStatusService, updateTechnicianLocation } from '@/graphql/services/mutations/mutation';
import { getRequestServiceById } from '@/graphql/services/queries/query';
import { createCustomer } from '@/graphql/users/mutation/customer';
import { createTechnician, updateLocationTechnician } from '@/graphql/users/mutation/technicians';
import { createUser } from '@/graphql/users/mutation/users';
import { getTechnician } from '@/graphql/users/query/technician';
export const handleCreateUserOnDatabase = async(values, isAdded) => {
    
    try {
        const { data } = await client.graphql({
            query: createUser,
            variables: {
                input: { ...values }
            },
            authMode: isAdded ? 'iam' : 'userPool'
        });
        return data;

    } catch (error) {
        console.log(error);
    }
}

// TECHNICIAN TECHNICIAN TECHNICIAN
export const handleCreateTechnicianOnDataBase = async(values, isAdded) => {
    try {
        const { data } = await client.graphql({
            query: createTechnician,
            variables: {
                input: { ...values }
            },
            // authMode: isAdded ? 'iam' : 'userPool'
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const handleUpdateLocationTechnician = async(values) => {
    try {
        const { data } = await client.graphql({
            query: updateLocationTechnician,
            variables: {
                input: { ...values }
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }   
}


export const handleRetrieveTechnician = async (id) => {
    try {
        const { data } = await client.graphql({
            query: getTechnician,
            variables : {
                id : id
            }
        })
        return data
    } catch (error) {
        console.log(error);
    }
} 
// TECHNICIAN TECHNICIAN TECHNICIAN

//REQUEST SERVICEEEEEES 

export const handleRetrieveRequestService = async (id) => {
    try {
        const { data } = await client.graphql({
            query: getRequestServiceById,
            variables : {
                id : id
            }
        })
        return data
    } catch (error) {
        console.log(error);
    }
} 

export const handleCreateOffer = async(values) => {
    try {
        const { data } = await client.graphql({
            query: createOffer,
            variables: {
                input: { ...values }
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const handleUpdateStatusService = async (values) => {
    try {
        const { data } = await client.graphql({
            query: updateStatusService,
            variables: {
                serviceId : values.serviceId,
                status: values.status
            }
        })
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const handleUpdateTechnicianLocationInService = async (values) => {
    try {
        const { data } = await client.graphql({
            query: updateTechnicianLocation,
            variables: {
                input: {
                  id: values.id,
                  destLatitude: values.destLatitude,
                  destLongitude: values.destLongitude
                },
                serviceCustomerId: values.serviceCustomerId
              }
        })
        return data;
    } catch (error) {
        console.log(error);
    }
}

//REQUEST SERVICEEEEEES 

export const handleCreateCustomerOnDataBase = async(values, isAdded) => {
    try {
        const { data } = await client.graphql({
            query: createCustomer,
            variables: {
                input: { ...values }
            },
            authMode: isAdded ? 'iam' : 'userPool'
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const handleRetrieveMyUser = async (cognitoId) => {
    try {

        const { data } = await client.graphql({
            query: getUserByCognitoID,
            variables: {
                cognitoId: cognitoId
            }
        });

        return data && data.listUsers.items[0];
    } catch (error) {
        console.log(error);
    }
}

export const getUserByMail = async (email) => {
    try {
        const { data } = await client.graphql({
            query: getUserByEmail,
            variables: {
                email: email
            }
        });

        return data && data.listUsers.items[0];
    } catch (error) {
        console.log(error);
    }
}