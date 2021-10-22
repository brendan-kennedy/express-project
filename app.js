const morgan = require('morgan')
const express = require('express')

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

app.post('/', (req, res) => {
    const {studentId, grade} =  req.params
})



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))