import apiClient from "./apiClient";

export const ticketService = {
    async createTicket(body){
        return await apiClient.post("tickets", body).data;
    },

    async getMyTickets(user_id){
        const tickets = await apiClient.get(`tickets/${user_id}`)
        return tickets.data;
    },    
    
    async createVisit(body){
        return await apiClient.post('tickets', body).data;
    },
};

export default ticketService