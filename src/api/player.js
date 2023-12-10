import request from "@/api/request";

export default {
  getPlayers({clubId, playerName, position}) {
    return request.get(`/players`, {
      params: {
        clubId: clubId,
        playerName: playerName,
        position: position
      }
    });
  },
  getManagers() {
    return request.get(`/managers`);
  }
}
