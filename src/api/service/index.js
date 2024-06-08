import { client } from "@/contexts/AmplifyContext";
import { listMyChatWithAdmin, listMyChatWithTechnician } from "@/graphql/chat/query";

export const existChatWithTechnicianSelected = async(customerId, technicianId) => {
    try {
        const { data } = await client.graphql({
            query: listMyChatWithTechnician,
            variables: {
                customerId,
                technicianId
            }
        });
        
        return data.listChats.items && data.listChats.items[0].id;
    } catch (error) {
        console.log(error);
    }
}

export const existChatWithCustomerSelected = async(customerId, adminId) => {
    try {
        const { data } = await client.graphql({
            query: listMyChatWithAdmin,
            variables: {
                customerId,
                adminId
            }
        });
        return data.listChats.items && data.listChats.items.length > 0 && data.listChats.items[0].id;
    } catch (error) {
        console.error(error);
    }
}