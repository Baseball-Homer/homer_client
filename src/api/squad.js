import request from "@/api/request";

export default {
  getSquad(squadId){
    return request.get(`/squads/${squadId}`);
  },
  getSquadStatistics(userId){
    return request.get(`/statistics/${userId}`);
  }
}
