const catchError = require('../utils/catchError');
const Student = require('../models/Student');
const { getAllStudents, createStudents, getOneStudents, removeStudents, updateStudents } = require('../services/student.services');

const getAll = catchError(async (req, res) => {
  const results = await getAllStudents()
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await createStudents(req.body)
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await getOneStudents(id)
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await removeStudents(id)
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await updateStudents(req.body, id)
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}