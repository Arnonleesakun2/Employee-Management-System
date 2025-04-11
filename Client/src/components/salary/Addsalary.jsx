import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import useEmployeeStore from "@/store/employee-store";
import Formbutton from "../form/Formbutton";
import { updateEmployeeSalary } from "@/api/salary";
import { salarySchema } from "@/utils/schemas";
import FormInput from "../form/FormInput";

const AddSalary = () => {
  const { employees, actionListEmployee } = useEmployeeStore();
  useEffect(() => {
    actionListEmployee();
  }, [actionListEmployee]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(salarySchema),
    defaultValues: {
      employeeId: "",
      salary: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resoLve) => setTimeout(resoLve, 2000));
      const res = await updateEmployeeSalary(data);
      toast.success(res.data.message, {
        position: "bottom-right",
      });
      reset();
      actionListEmployee();
    } catch (error) {
      toast.error(error.message || "Failed to update salary", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Salary</CardTitle>
        <CardDescription>Set employee salary information</CardDescription>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Employee</label>
            <input type="text" hidden {...register("employeeId")} />
            <Select onValueChange={(value) => setValue("employeeId", value)}>
              <SelectTrigger  className="w-full">
                <SelectValue placeholder="Select an employee" />
              </SelectTrigger>
              <SelectContent>
                {employees && employees.length > 0 ? (
                  employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.firstname} {employee.lastname} -{" "}
                      {employee.position}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-employee" disabled>
                    No employees found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.employeeId && (
              <span className="text-sm text-red-400">
                {errors.employeeId.message}
              </span>
            )}
          </div>

          <FormInput
            type="number"
            register={register}
            name="salary"
            errors={errors}
          />
          <div className="mt-4">
            <Formbutton text="Update Salary" isPending={isSubmitting} />
          </div>
        </form>
      </CardHeader>
    </Card>
  );
};

export default AddSalary;
