import NewEmployeeTable from "@/components/employee/NewEmployeeTable";

const ListNewEmployee = () => {
  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold text-center">New Employees</h2>
      <div className="mt-8">
        <NewEmployeeTable/>
      </div>
    </section>
  );
};

export default ListNewEmployee;
