import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from "lucide-react";
import useEmployeeStore from "@/store/employee-store";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AddEmployeeButton = ({ employee }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const actionAddEmployee = useEmployeeStore((state) => state.actionAddEmployee);
  const actionListJNewEmployee = useEmployeeStore((state) => state.actionListJNewEmployee);

  const handleAdd = async () => {
    if (!employee || !employee.id) return;

    setIsAdding(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = await actionAddEmployee(employee.id);
      if (result.success) {
        toast.success("Employee added successfully", {
          position: "bottom-left",
        });
        actionListJNewEmployee(); // Refresh the new employees list
      } else {
        toast.error("Failed to add employee", {
          position: "bottom-left",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        position: "bottom-left",
      });
    } finally {
      setIsAdding(false);
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-green-500 hover:text-green-700 hover:bg-green-100 cursor-pointer"
          disabled={isAdding}
        >
          {isAdding ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add this employee to the company?</AlertDialogTitle>
          <AlertDialogDescription>
            This will add {employee.firstname} {employee.lastname} as a regular employee.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAdd}
          >
            Add
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddEmployeeButton;