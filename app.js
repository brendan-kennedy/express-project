const morgan = require('morgan')
const express = require('express')
const {uniqueId} = require('lodash')
const app = express()
const port = 8080

const students = { 
    1337: {id: 1337 , name:'brendan' , city:'Leesburg, VA' , grades:[]}
}


app.use(express.json())
app.use(express.urlencoded({extended:true }))
app.use(morgan('default'))
app.get('/students', async function(req, res) {
    if(req.query.search) { 
        const filteredStudentList = studentList.filter((student) => student.name.includes(req.query.search))
        res.status(200).send(filteredStudentList)
    }else{
        res.status(200).send(studentList)
    }
})

app.get('/students/:studentID', (req, res) => {
    const {studentId} =  req.params
    if(!students[studentId]){ 
        res.status(404).send(`Student ${studentId} not located`)
    }else{ 
        res.status(200).send(students[studentId])
    }
})

app.get('/students/:studentID', (req, res) => {
    const {studentId} =  req.params
    if(!students[studentId]){ 
        res.status(404).send(`Student ${studentId} not located`)
    }else{ 
        res.status(200).send(students[studentId].grades)
    }
})

app.post('/grades/', (req, res) => {
    const {studentId, grade} =  req.body
    if (!students[studentId]) {
        res.status(404).send(`Student ${studentId} not found`)
    }else{ 
        students[studentId].grades.push(grade)
        res.status(200).send(`Grades updated for student ${studentId}`)
    }
})

app.post('/register', (req, res) => {
    const newId =  uniqueId()
    const student = req.body
    student.id = newId
    student.grades = []
    students[newId] = student
    res.status(201).send(`Student saved and assigned id: ${newId}`)

});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))