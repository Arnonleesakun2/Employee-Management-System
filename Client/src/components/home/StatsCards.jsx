import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BadgeDollarSign, UserPlus, Calculator } from 'lucide-react';

const StatsCards = ({ employees, payrolls, totalSalaryThisMonth, averageSalary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{employees.length}</div>
          <p className="text-xs text-muted-foreground">Active employees</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
          <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ฿{totalSalaryThisMonth.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Total paid this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
          <Calculator className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ฿{Math.round(averageSalary).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Per employee</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{payrolls.length}</div>
          <p className="text-xs text-muted-foreground">Total payroll records</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;