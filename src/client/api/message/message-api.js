import {api} from "../api";


export const messageApi = {
    getMessages : (conversationId) => api.get(`/api/conversation/${conversationId}/messages`)
}