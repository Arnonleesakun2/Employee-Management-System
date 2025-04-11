import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
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

const DeleteEmployeeButton = ({ employee }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const actionDeleteEmployee = useEmployeeStore((state) => state.actionDeleteEmployee);

  const handleDelete = async () => {
    if (!employee || !employee.id) return;

    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = await actionDeleteEmployee(employee.id);
      if (result.success) {
        toast.success("Employee deleted successfully", {
          position: "bottom-left",
        });
      } else {
        toast.error("Failed to delete employee", {
          position: "bottom-left",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        position: "bottom-left",
      });
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-100 cursor-pointer"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this employee?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {employee.firstname} {employee.lastname}'s
            record from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEmployeeButton;
