import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecentPayrolls = ({ payrolls }) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Recent Payroll Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payrolls.slice(0, 5).map((payroll) => (
            <div key={payroll.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">
                  {payroll.employee?.firstname} {payroll.employee?.lastname}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(payroll.payDate).toLocaleDateString()}
                </p>
              </div>
              <div className="font-medium">
                ฿{payroll.totalPaid.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPayrolls;