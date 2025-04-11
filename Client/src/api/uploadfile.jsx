import axios from "axios";

export const uploadImage = async (data) => {
  return await axios.post("https://employee-management-server-mu-three.vercel.app/api/images", { image: data });
};
