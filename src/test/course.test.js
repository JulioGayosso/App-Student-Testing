require('../models')
const request = require("supertest")
const app = require("../app");

let studentId

beforeAll(async () => {
  const students = {
    firstName: 'Ivan',
    lastName: 'Arteaga',
    birthday: '2022-10-09',
    program: 'Ing. software'
  }

  const res = await request(app)
    .post('/api/v1/students')
    .send(students)

  studentId = res.body.id
})

afterAll(async () => {
  await request(app)
    .delete(`/api/v1/students/${studentId}`)
})

let courseId

const course = {
  name: "algebra",
  credits: 10,
}

const BASE_URL = '/api/v1/courses'

test("Post '/courses' should return status code 201 and res.body.name = course.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(course)

  courseId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(course.name)
})

test("Get '/courses' should return a statusCode 200", async () => {

  const res = await request(app)
    .get(BASE_URL)

  // console.log(res.body)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  // expect(res.body).toHaveLength(1)
  expect(res.body).toHaveLength(1)

  expect(res.body[0].students).toBeDefined()
  expect(res.body[0].students).toHaveLength(0)
})

test("GET -> '/courses/:id', should return status code 200, res.body to be defined and res.body.name === course.name", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${courseId}`)

  // console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(course.name)
  expect(res.body.students).toBeDefined()
  expect(res.body.students).toHaveLength(0)

})

test("PUT -> '/courses/:id', should return status code 200, res.body.name ==== courseUpdate.name  ", async () => {

  const courseUpdate = {
    name: "analisis",
    credits: 3,
  }
  const res = await request(app)
    .put(`${BASE_URL}/${courseId}`)
    .send(courseUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(courseUpdate.name)
  expect(res.body.credits).toBe(courseUpdate.credits)
})

test("POST -> '/courses/:id/students', should return status code 200, adn res.body to be defined", async () => {


  const res = await request(app)
    .post(`${BASE_URL}/${courseId}/students`)
    .send([studentId])


  // console.log(res.body[0].courseStudent.studentId) //2

  expect(res.status).toBe(200) //!!! 
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].id).toBeDefined()
  expect(res.body[0].id).toBe(studentId)

  expect(res.body[0].courseStudent.studentId).toBeDefined()
  expect(res.body[0].courseStudent.studentId).toBe(studentId)

})



test("Delete -> 'courses/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${courseId}`)

  expect(res.statusCode).toBe(204)
})