require('dotenv').config()
const axios = require('axios')
const express = require('express')
const app = express()
const port = process.env.PORT || 8081
app.use(express.json())

const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Routers
const courseRoute = require('./routes/course.route')
app.use('/api', courseRoute)

app.listen(port, () => {
  console.log(`CourseSummary REST API listening at http://localhost:${port}`)
})