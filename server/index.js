require('dotenv').config()
const axios = require('axios')
const express = require('express')
const app = express()
const port = process.env.PORT || 8081
app.use(express.json())

// Routers
const courseRoute = require('./routes/course.route')
app.use('/api', courseRoute)

app.listen(port, () => {
  console.log(`CourseSummary REST API listening at http://localhost:${port}`)
})