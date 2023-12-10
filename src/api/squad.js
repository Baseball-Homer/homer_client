import request from "@/api/request";

export default {
  getSquad(squadId){
    return request.get(`/squads/${squadId}`);
  },
  getSquadStatistics(userId){
    return request.get(`/statistics/${userId}`);
  },
  createSquad({managerId, userId, players}){
    return request.post('/squads', {
        UserId: userId, managerId, players
    });
  },
  updateSquad({managerId, userId, players}){
    return request.put('/squads', {
      UserId: userId, managerId, players
    });
  }
}
