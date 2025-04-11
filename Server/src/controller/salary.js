const prisma = require("../config/db");

exports.updateSalary = async (req, res, next) => {
  try {
    const { employeeId, salary } = req.body;

    const updatedEmployee = await prisma.employee.update({
      where: { id: employeeId },
      data: { salary: salary },
    });

    res.json({
      message: "Salary updated successfully",
      result: updatedEmployee,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPayrolls = async (req, res, next) => {
  try {
    const payrolls = await prisma.payroll.findMany({
      include: {
        employee: {
          select: {
            firstname: true,
            lastname: true,
            position: true
          }
        }
      },
      orderBy: {
        payDate: 'desc'
      }
    });

    res.json({
      message: "Payroll records retrieved successfully",
      result: payrolls
    });
  } catch (error) {
    next(error);
  }
};

exports.createPayroll = async (req, res, next) => {
  try {
    const { employeeId, baseSalary, bonus, tax, totalPaid, payDate, note } = req.body;
    const payroll = await prisma.payroll.create({
      data: {
        employeeId,
        baseSalary,
        bonus,
        tax,
        totalPaid,
        payDate: new Date(payDate),
        note
      },
      include: {
        employee: true
      }
    });
    res.json({
      message: "Salary calculation saved successfully",
      result: payroll
    });
  } catch (error) {
    next(error);
  }
};
