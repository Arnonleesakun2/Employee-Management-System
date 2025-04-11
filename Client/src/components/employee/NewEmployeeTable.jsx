import useEmployeeStore from "@/store/employee-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import EmployeeRowDrawer from "./EmployeeRowDrawer";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import DeleteEmployeeButton from "./DeleteEmployeeButton";
import AddEmployeeButton from "./AddEmployeeButton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 6;

const NewEmployeeTable = () => {
  const actionListJNewEmployee = useEmployeeStore((state) => state.actionListJNewEmployee);
  const newemployees = useEmployeeStore((state) => state.newemployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    actionListJNewEmployee();
  }, []);

  const totalPages = Math.ceil(newemployees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEmployees = newemployees.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setOpenView(true);
  };

  return (
    <div className="md:w-[60%] mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>FirstName</TableHead>
            <TableHead>Position</TableHead>
            <TableHead className="text-center w-[40px]">Add</TableHead>
            <TableHead className="text-center w-[40px]">View</TableHead>
            <TableHead className="text-center w-[40px]">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedEmployees.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.firstname}</TableCell>
              <TableCell>{item.position}</TableCell>
              <TableCell className="text-center">
                <AddEmployeeButton employee={item} />
              </TableCell>
              <TableCell className="text-center">
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => handleView(item)}
                >
                  <Eye />
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <DeleteEmployeeButton employee={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="">
              Total
            </TableCell>
            <TableCell className="text-right">
              {newemployees.length} employees
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  isActive={currentPage !== 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  isActive={currentPage !== totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <EmployeeRowDrawer
        open={openView}
        onClose={setOpenView}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default NewEmployeeTable;
