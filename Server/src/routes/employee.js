const express = require("express");
const {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  listEmployee,
  listNewEmployee,
  addEmployee,
} = require("../controller/employee");
const router = express.Router();

router.post("/createemployee", createEmployee);
router.post("/updateemployee", updateEmployee);
router.delete("/deleteemployee/:id", deleteEmployee);
router.get("/listemployee", listEmployee);
router.get("/listnewemployee", listNewEmployee);
router.post("/addemployee/:id", addEmployee);
module.exports = router;
