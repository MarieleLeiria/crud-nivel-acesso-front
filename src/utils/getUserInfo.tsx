import api from "../api/api";

export async function getUserInfo(id: string) {
  try {
    const response = await api.get(`/users/${id}`);
    const user = response.data.data;
    console.log("get info:", user);
    return user;
  } catch (error) {
    console.log(error);
  }
}
