const express = require('express')
const database = require("./database.js")

const app = express()
const port = 3000

app.get('/get_all_cities', (req, res) => {

    var response_string = ""

    database.all('SELECT * FROM Cities', (err, rows) => {

        for(const row of rows){
            row_readable = `${row.ZIP}: ${row.CityName}`
            
            if(row.ZIP == 76313){
                response_string += "<b>" + row_readable + "</b><br/>"
            }else{
                response_string +=  "<b>" + row_readable +"</b><br/>"
            }
        }
        res.send(response_string)
    })
    
})

app.get('/get_all_courses', (req, res) => {

    var response_string = ""

    
    database.all('SELECT  c.courseName, c.attendanceRate, c.degreeProgram, l.LocationName AS locationName, ci.CityName AS cityName FROM Courses AS c LEFT JOIN Locations AS l ON c.locationID = l.LocationID LEFT JOIN Cities AS ci ON l.ZIP = ci.ZIP;', (err, rows) => {

        for(const row of rows){
            const row_readable = `${row.courseName} with ${row.attendanceRate}% (Study Program: ${row.degreeProgram}) in ${row.locationName || 'Unknown location'}, ${row.cityName || 'Unknown city'}`;
            if(row.attendanceRate <= 50){
                response_string += "<b>" + row_readable + "</b><br/>"
            }else{
                response_string +=  row_readable + "</b><br/>"
            }

            
        }
        res.send(response_string)
    })
})
/*
 Task 1: Create a new route /get_all_courses that produces
 the following type of output: InfoSys with 90% attendence rate (Study Program: EC) in 83278, Traunstein

 Task 2: Highlight courses with an attendence rate < 50%
 with a red color (see CSS).
 */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})