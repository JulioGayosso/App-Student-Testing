const Student = require('./Student')
const Course = require('./Course')


Course.belongsToMany(Student, { through: "courseStudent" })
Student.belongsToMany(Course, { through: "courseStudent" })