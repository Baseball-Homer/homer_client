import request from "@/api/request";

export default {
  playMatch(homeId, awayId){
    return request.post(`/match/${homeId}?awayId=${awayId}`);
  },
}
