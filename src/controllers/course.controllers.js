const catchError = require('../utils/catchError');
const Course = require('../models/Course');
const Student = require('../models/Student');

const getAll = catchError(async (req, res) => {
  const results = await Course.findAll({ include: [Student] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Course.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Course.findByPk(id, { include: [Student] });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Course.destroy({ where: { id } });
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Course.update(
    req.body,
    { where: { id }, returning: true }
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

//a los cursos le puedo setear students
//! /courses/:id/students
const setStudents = catchError(async (req, res) => {
  //obtengo id de los parametros
  const { id } = req.params
  //busco el curso 
  const course = await Course.findByPk(id)
  if (!course) return res.status(404).json({ error: "Course not found" })
  //seteo los students y los guardo en una variable 
  await course.setStudents(req.body)
  const students = await course.getStudents()
  //doy vista
  return res.json(students)
})

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setStudents
}