import { useEffect } from 'react';
import useEmployeeStore from '@/store/employee-store';
import StatsCards from './StatsCards';
import RecentPayrolls from './RecentPayrolls';

const HomeContainer = () => {
  const { employees, payrolls, actionListEmployee, actionGetPayrolls } = useEmployeeStore();
  
  useEffect(() => {
    actionListEmployee();
    actionGetPayrolls();
  }, []);
  const currentMonth = new Date().getMonth();
  const totalSalaryThisMonth = payrolls
    .filter(payroll => new Date(payroll.payDate).getMonth() === currentMonth)
    .reduce((sum, payroll) => sum + payroll.totalPaid, 0);
  const averageSalary = employees.length 
    ? employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length 
    : 0;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard Overview</h1>
      <StatsCards 
        employees={employees}
        payrolls={payrolls}
        totalSalaryThisMonth={totalSalaryThisMonth}
        averageSalary={averageSalary}
      />
      <RecentPayrolls payrolls={payrolls} />
    </div>
  );
};

export default HomeContainer
