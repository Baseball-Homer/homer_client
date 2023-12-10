import request from "@/api/request";

export default {
  getSquad(squadId){
    return request.get(`/squads/${squadId}`);
  },
  getPlayer(playerName, clubName, position){
    return request.get(`/players?playerName=${playerName}&clubName=${clubName}&position=${position}`);
  },
  getSquadStatistics(userId){
    return request.get(`/statistics/${userId}`);
  }
}
