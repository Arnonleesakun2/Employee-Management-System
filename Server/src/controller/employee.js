const prisma = require("../config/db");

exports.createEmployee = async (req, res, next) => {
  try {
    const { firstname, lastname, phone, email, position, address, image } =
      req.body;
    const result = await prisma.employee.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        position: position,
        address: address,
        image: image.secure_url,
        status: "0",
      },
    });
    res.json({ message: "Register Successfully", result: result });
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const { id, firstname, lastname, phone, email, position, address, image } =
      req.body;
    if (!id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }
    const data = {
      firstname,
      lastname,
      phone,
      email,
      position,
      address,
    };
    if (image && image.secure_url) {
      data.image = image.secure_url;
    }
    const result = await prisma.employee.update({
      where: { id },
      data,
    });
    res.json({ message: "Updated Successfully", result: result });
  } catch (error) {
    console.error("Update error:", error);
    next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }
    await prisma.payroll.deleteMany({
      where: { employeeId: id }
    });
    const result = await prisma.employee.delete({
      where: { id },
    });

    res.json({ 
      message: "Employee and associated payroll records deleted successfully", 
      result: result 
    });
  } catch (error) {
    console.error("Delete error:", error);
    next(error);
  }
};

exports.listEmployee = async (req, res, next) => {
  try {
    const result = await prisma.employee.findMany({
      where: {
        status: "1",
      },
    });
    res.json({ result: result });
  } catch (error) {
    next(error);
  }
};

exports.listNewEmployee = async (req, res, next) => {
  try {
    const result = await prisma.employee.findMany({
      where: {
        status: "0",
      },
    });
    res.json({ result: result });
  } catch (error) {
    next(error);
  }
};

exports.addEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }
    const result = await prisma.employee.update({
      where: { id },
      data: { status: "1" },
    });
    res.json({ message: "Employee added successfully", result: result });
  } catch (error) {
    console.error("Add employee error:", error);
    next(error);
  }
};


