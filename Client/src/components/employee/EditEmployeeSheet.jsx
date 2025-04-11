import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/utils/schemas";
import { updateEmployee } from "@/api/employee";
import { toast } from "sonner";
import useEmployeeStore from "@/store/employee-store";
import FormInput from "../form/FormInput";
import Formimage from "../form/Formimage";
import Formposition from "../form/Formposition";
import Formbutton from "../form/Formbutton";
import { Button } from "../ui/button";
import { useEffect } from "react";

const EditEmployeeSheet = ({ open, onClose, employee }) => {
  const actionListEmployee = useEmployeeStore(
    (state) => state.actionListEmployee
  );
  const { handleSubmit, register, setValue, reset, formState } = useForm({
    resolver: zodResolver(employeeSchema),
  });
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    if (employee) {
      reset({
        id: employee?.id || "",
        firstname: employee.firstname || "",
        lastname: employee.lastname || "",
        phone: employee.phone || "",
        email: employee.email || "",
        address: employee.address || "",
        position: employee.position || "",
      });
    }
  }, [employee, reset]);
  const hldSubmit = async (data) => {
    try {
      await new Promise((resoLve) => setTimeout(resoLve, 2000));
      const res = await updateEmployee(data);
      toast.success(res.data.message, {
        position: "bottom-left",
      });
      onClose(false);
      actionListEmployee();
    } catch (error) {
      console.error("Error:", error); // Debug log
      toast.error(error.message || "Update failed", {
        position: "bottom-left",
      });
    }
  };
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Employee</SheetTitle>
          <SheetDescription>
            Update employee information below.
          </SheetDescription>
          <form onSubmit={handleSubmit(hldSubmit)}>
            <div className="space-y-1 mt-2">
              <input
                hidden
                {...register("id")}
                defaultValue={employee?.id || ""}
                type="text"
              />
              <Formimage setValue={setValue} errors={errors} />
              <FormInput
                errors={errors}
                register={register}
                name="firstname"
                type="text"
                defuiltValue={employee?.firstname || ""}
              />
              <FormInput
                errors={errors}
                register={register}
                name="lastname"
                type="text"
                defuiltValue={employee?.lastname || ""}
              />
              <FormInput
                errors={errors}
                register={register}
                name="phone"
                type="number"
                defuiltValue={employee?.phone || ""}
              />
              <FormInput
                errors={errors}
                register={register}
                name="email"
                type="email"
                defuiltValue={employee?.email || ""}
              />
              <FormInput
                errors={errors}
                register={register}
                name="address"
                type="text"
                defuiltValue={employee?.address || ""}
              />
              <Formposition
                errors={errors}
                setValue={setValue}
                name="position"
                register={register}
                defuiltValue={employee?.position || ""}
              />
            </div>
            <div className="mt-4">
              <Formbutton isPending={isSubmitting} text="Save" />
            </div>
          </form>
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => onClose(false)}>
              Cancel
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default EditEmployeeSheet;
