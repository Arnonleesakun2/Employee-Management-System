import Layout from "@/layout/Layout";
import CreateEmployee from "@/pages/employess/CreateEmployee";
import ListEmployee from "@/pages/employess/ListEmployee";
import ListNewEmployee from "@/pages/employess/ListNewEmployee";
import Home from "@/pages/Home";
import Notfound from "@/pages/Notfound";
import Calsalary from "@/pages/salarys/Calsalary";
import Salary from "@/pages/salarys/Salary";
import SalaryTable from "@/pages/salarys/SalaryTable";
import { BrowserRouter, Routes, Route } from "react-router";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="employee" element={<Layout />}>
          <Route path="create" element={<CreateEmployee/>} />
          <Route path="employees" element={<ListEmployee/>} />
          <Route path="newemployees" element={<ListNewEmployee/>} />
        </Route>
        <Route path="salary" element={<Layout />}>
          <Route path="addsalary" element={<Salary/>} />
          <Route path="calsalary" element={<Calsalary/>} />
          <Route path="salarys" element={<SalaryTable/>} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
