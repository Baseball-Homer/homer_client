import request from "@/api/request";

export default {
  getOtherUser(userId){
    return request.get(`/rivals/${userId}`);
  },
  getUser(userId){
    return request.get(`/users/${userId}`);
  }
}
