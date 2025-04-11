import { listEmployee, deleteEmployee, listNewEmployee, addEmployee } from "@/api/employee";
import { getPayrolls } from "@/api/salary";
import { create } from "zustand";

const employeeStore = (set, get) => ({
  employees: [],
  newemployees: [],
  payrolls: [],
  actionListEmployee: async () => {
    try {
      const res = await listEmployee();
      set({ employees: res.data.result });
    } catch (error) {
      console.log(error);
    }
  },
  actionListJNewEmployee: async () => {
    try {
      const res = await listNewEmployee();
      set({
        newemployees: res.data.result,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionAddEmployee: async (id) => {
    try {
      await addEmployee(id);
      set((state) => ({
        newemployees: state.newemployees.filter((employee) => employee.id !== id),
      }));
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },
  actionDeleteEmployee: async (id) => {
    try {
      await deleteEmployee(id);
      set((state) => ({
        employees: state.employees.filter((employee) => employee.id !== id),
      }));
      set((state) => ({
        newemployees: state.newemployees.filter((employee) => employee.id !== id),
      }));
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },
  actionGetPayrolls: async () => {
    try {
      const res = await getPayrolls();
      set({ payrolls: res.data.result });
    } catch (error) {
      console.log(error);
    }
  },
});

const useEmployeeStore = create(employeeStore);
export default useEmployeeStore;
