import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const EmployeeRowDrawer = ({ open, onClose, employee }) => {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="px-6  max-w-md mx-auto rounded-t-xl shadow-lg">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-2xl font-semibold t">
            {employee
              ? `${employee.firstname} ${employee.lastname}`
              : "Employee Detail"}
          </DrawerTitle>
          <DrawerDescription className="">
            Employee profile summary
          </DrawerDescription>
        </DrawerHeader>

        {employee && (
          <div className="space-y-4 mt-4 text-sm  px-4">
            <div className="flex flex-col items-center">
              {employee.image && (
                <img
                  src={employee.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-md mb-3 border border-gray-200"
                />
              )}
              <p className="text-lg font-medium">{employee.position}</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <p>
                <span className="font-semibold">Email:</span> {employee.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {employee.phone}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {employee.address}
              </p>
              <p>
                <span className="font-semibold">Salary:</span>{" "}
                {employee.salary}
              </p>
            </div>
          </div>
        )}

        <DrawerFooter className="mt-6">
          <Button
            onClick={() => onClose(false)}
            className="w-full"
            variant="outline"
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EmployeeRowDrawer;
