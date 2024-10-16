
const Course = require("../models/Course");
const Student = require("../models/Student");

const getAllStudents = async () => {
  return await Student.findAll({include:[Course]});
}

const createStudents = async (body) => {
  return await Student.create(body);
}

const getOneStudents = async (id) => {
  return await Student.findByPk(id);
}

const updateStudents = async (body, id) => {
  return await Student.update(
    body,
    { where: { id }, returning: true }
  );
}

const removeStudents = async (id) => {
  return await Student.destroy({ where: { id } });
}

module.exports = {
  getAllStudents,
  createStudents,
  getOneStudents,
  updateStudents,
  removeStudents

}
