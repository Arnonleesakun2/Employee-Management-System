import EmployeeTable from "@/components/employee/EmployeeTable";
import useEmployeeStore from "@/store/employee-store";
import { useEffect } from "react";

const ListEmployee = () => {
  const actionListEmployee = useEmployeeStore(
    (state) => state.actionListEmployee
  );
  useEffect(() => {
    actionListEmployee();
  }, []);
  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold text-center">Employees</h2>
      <div className="mt-8">
        <EmployeeTable/>
      </div>
    </section>
  );
};

export default ListEmployee;
