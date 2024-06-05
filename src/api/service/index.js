import { client } from "@/contexts/AmplifyContext";
import { listMyChatWithTechnician } from "@/graphql/chat/query";
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