const express = require("express");
const { updateSalary, createPayroll, getPayrolls } = require("../controller/salary");
const router = express.Router();

router.patch("/addsalary", updateSalary);
router.post("/payroll", createPayroll);
router.get("/payroll", getPayrolls);

module.exports = router;
