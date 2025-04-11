import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useEmployeeStore from "@/store/employee-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import FormInput from "@/components/form/FormInput";
import Formbutton from "../form/Formbutton";
import { payrollSchema } from "@/utils/schemas";
import { Input } from "../ui/input";
import { createPayroll } from "@/api/salary";
import { toast } from "sonner";

const CalSalarycon = () => {
  const { employees, actionListEmployee } = useEmployeeStore();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [date, setDate] = useState(null); // เปลี่ยนจาก new Date() เป็น null

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(payrollSchema),
    defaultValues: {
      bonus: 0,
      tax: 0,
      note: "",
      payDate: null,
    },
  });

  useEffect(() => {
    actionListEmployee();
  }, [actionListEmployee]);

  const handleEmployeeChange = (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    setSelectedEmployee(employee);
    setValue("employeeId", employeeId);
    setValue("baseSalary", employee.salary);
    calculateTotal();
  };

  const calculateTotal = () => {
    const baseSalary = selectedEmployee?.salary || 0;
    const bonus = parseFloat(watch("bonus")) || 0;
    const tax = parseFloat(watch("tax")) || 0;
    const total = baseSalary + bonus - tax;
    setValue("totalPaid", total);
  };

  useEffect(() => {
    calculateTotal();
  }, [watch("bonus"), watch("tax")]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resoLve) => setTimeout(resoLve, 2000));
      const payload = {
        employeeId: data.employeeId,
        baseSalary: selectedEmployee.salary,
        bonus: parseFloat(data.bonus),
        tax: parseFloat(data.tax),
        totalPaid: parseFloat(data.totalPaid),
        payDate: data.payDate,
        note: data.note || "",
      };
      const res = await createPayroll(payload);
      toast.success(res.data.message, {
        position: "bottom-right",
      });
      reset();
      setSelectedEmployee(null);
      setDate(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save salary calculation",
        {
          position: "bottom-right",
        }
      );
      console.error("Error:", error);
    }
  };

  return (
    <Card className="max-w-[1000px] mx-auto">
      <CardHeader>
        <CardTitle>Salary Calculation</CardTitle>
        <CardDescription>Calculate employee's monthly salary</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="space-y-2">
                <Label>Employee</Label>
                <Select onValueChange={handleEmployeeChange}>
                  <SelectTrigger
                    className={
                      errors.employeeId ? "border-red-500 w-full" : "w-full"
                    }
                  >
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees?.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.firstname} {employee.lastname} -{" "}
                        {employee.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.employeeId && (
                  <span className="text-sm text-red-500">
                    {errors.employeeId.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label>Base Salary</Label>
                <Input
                  type="number"
                  value={selectedEmployee?.salary || 0}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <FormInput
                type="number"
                name="bonus"
                register={register}
                errors={errors}
                onChange={(e) => {
                  setValue("bonus", parseFloat(e.target.value) || 0);
                  calculateTotal();
                }}
              />
            </div>
            <div className="space-y-2">
              <FormInput
                type="number"
                name="tax"
                register={register}
                errors={errors}
                onChange={(e) => {
                  setValue("tax", parseFloat(e.target.value) || 0);
                  calculateTotal();
                }}
              />
              <FormInput
                type="number"
                name="totalPaid"
                register={register}
                errors={errors}
                defuiltValue={watch("totalPaid") || 0}
                disabled
              />
              <div className="space-y-2">
                <Label>Payment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        errors.payDate && "border-red-500" // เล่ม error style
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        setDate(newDate);
                        setValue("payDate", newDate);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.payDate && ( // เล่ม error message
                  <span className="text-sm text-red-500">
                    {errors.payDate.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-2">
            <FormInput
              type="text"
              name="note"
              register={register}
              errors={errors}
              placeholder="e.g., April 2024 Salary"
            />
          </div>
          <div className="mt-4">
            <Formbutton text="Calculate and Save" isPending={isSubmitting} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CalSalarycon;
