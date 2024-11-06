import { client } from "@/contexts/AmplifyContext";
import { retrieveCustomerRate } from "@/graphql/users/customer/query";

export const getCustomerRates = async(customerId) => {
    try {
        const result = await client.graphql({
            query: retrieveCustomerRate,
            variables: {
                id: customerId
            },
        });
        const rate = result.data.getCustomer.rate;
        return rate && rate.items.length > 0 ? rate : [];
    } catch (error) {
        throw error;
    }
}