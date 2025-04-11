import axios from "axios";

export const createEmployee = async (data) => {
  return await axios.post("https://employee-management-server-mu-three.vercel.app/api/createemployee", data);
};
export const updateEmployee = async (data) => {
  return await axios.post("https://employee-management-server-mu-three.vercel.app/api/updateemployee", data);
};
export const deleteEmployee = async (id) => {
  return await axios.delete(`https://employee-management-server-mu-three.vercel.app/api/deleteemployee/${id}`);
};
export const listEmployee = async () => {
  return await axios.get("https://employee-management-server-mu-three.vercel.app/api/listemployee");
};
export const listNewEmployee = async () => {
  return await axios.get("https://employee-management-server-mu-three.vercel.app/api/listnewemployee");
};
export const addEmployee = async (id) => {
  return await axios.post(`https://employee-management-server-mu-three.vercel.app/api/addemployee/${id}`);
};

