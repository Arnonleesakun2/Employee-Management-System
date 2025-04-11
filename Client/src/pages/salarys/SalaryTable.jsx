
import { useEffect, useState } from "react";
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
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 6;

const SalaryTable = () => {
  const { payrolls, actionGetPayrolls } = useEmployeeStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    actionGetPayrolls();
  }, []);

  const totalPages = Math.ceil(payrolls.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPayrolls = payrolls.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold text-center">Salary History</h2>
      <div className="mt-8 md:w-[80%] mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Base Salary</TableHead>
              <TableHead>Bonus</TableHead>
              <TableHead>Tax</TableHead>
              <TableHead>Total Paid</TableHead>
              <TableHead>Pay Date</TableHead>
              <TableHead>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPayrolls.map((payroll) => (
              <TableRow key={payroll.id}>
                <TableCell>{payroll.employee.firstname}</TableCell>
                <TableCell>{payroll.employee.position}</TableCell>
                <TableCell>฿{payroll.baseSalary.toLocaleString()}</TableCell>
                <TableCell>฿{payroll.bonus.toLocaleString()}</TableCell>
                <TableCell>฿{payroll.tax.toLocaleString()}</TableCell>
                <TableCell>฿{payroll.totalPaid.toLocaleString()}</TableCell>
                <TableCell>
                  {format(new Date(payroll.payDate), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{payroll.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>Total Records</TableCell>
              <TableCell className="text-right">
                {payrolls.length} records
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
      </div>
    </section>
  );
};

export default SalaryTable;
