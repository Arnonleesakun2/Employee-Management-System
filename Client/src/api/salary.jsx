import axios from "axios";

export const updateEmployeeSalary = async (data) => {
  return await axios.patch("https://employee-management-server-mu-three.vercel.app/api/addsalary", data);
};

export const createPayroll = async (data) => {
  return await axios.post("https://employee-management-server-mu-three.vercel.app/api/payroll", data);
};

export const getPayrolls = async () => {
  return await axios.get("https://employee-management-server-mu-three.vercel.app/api/payroll");
};
