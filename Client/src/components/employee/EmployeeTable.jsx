import useEmployeeStore from "@/store/employee-store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import EmployeeRowDrawer from "./EmployeeRowDrawer";
import { Button } from "../ui/button";
import { Eye, Bolt } from "lucide-react";
import EditEmployeeSheet from "./EditEmployeeSheet";
import DeleteEmployeeButton from "./DeleteEmployeeButton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 6;

const EmployeeTable = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEmployees = employees.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setOpenView(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenEdit(true);
  };

  return (
    <div className="md:w-[60%] mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>FirstName</TableHead>
            <TableHead>Position</TableHead>  
            <TableHead>Salary</TableHead>
            <TableHead className="text-center w-[40px]">View</TableHead>
            <TableHead className="text-center w-[40px]">Edit</TableHead>
            <TableHead className="text-center w-[40px]">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedEmployees.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.firstname}</TableCell>
              <TableCell>{item.position}</TableCell>
              <TableCell>{item.salary}</TableCell>
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
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => handleEdit(item)}
                >
                  <Bolt />
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
            <TableCell colSpan={5} className="">
              Total
            </TableCell>
            <TableCell className="text-right">
              {employees.length} employees
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
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
      <EditEmployeeSheet
        open={openEdit}
        onClose={setOpenEdit}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EmployeeTable;
