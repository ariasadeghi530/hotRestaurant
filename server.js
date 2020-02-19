const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(express.static(path.join(__dirname, 'public')));

app.post('/reservations', (req, res) => {
  fs.readFile('people.json', 'utf8', (e, data) => {
    if (e) { console.log(e) }

    const reservations = JSON.parse(data)

    reservations.push(req.body)

    fs.writeFile('people.json', JSON.stringify(reservations), e => {
      if (e) { console.log(e) }
      res.sendStatus(200)
    })
  })
})

// index
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})
// tables
app.get('/tables', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/view.html'))
})
// reservations
app.get('/reservations', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/make.html'))
})

app.listen(3000)
