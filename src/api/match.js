import request from "@/api/request";

export default {
  createMatch(userId, awayId){
    return request.post(`/match/${userId}?awayId=${awayId}`);
  },
}
