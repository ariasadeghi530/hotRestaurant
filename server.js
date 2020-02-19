const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(express.static(path.join(__dirname, 'public')))

app.get('/reservations', (req,res) => {
  fs.readFile('people.json', 'utf8', (e, data) => {
    if (e) {console.log(e)}

    const reservations = JSON.parse(data)

    res.json(reservations)
  })
})

app.post('/reservations', (req, res) => {
  fs.readFile('people.json', 'utf8', (e, data) => {
    if (e) { console.log(e) }

    const employees = JSON.parse(data)

    employees.push(req.body)

    fs.writeFile('people.json', JSON.stringify(employees), e => {
      if (e) { console.log(e) }
      res.sendStatus(200)
    })
  })
})

app.listen(3000)
