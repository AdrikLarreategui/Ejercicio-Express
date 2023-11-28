const express = require ('express')
const app = express()
const port = 3030 
const path = require ('path')

app.get('/', (req, res) => {
    res.send ('Welcome to the website')
})

app.get('/product', (req, res) => {
    res. send ('Product List')
})

app.use(express.json())
app.post('/product', (req, res) => {
    res.send('Create a product')
})

app.put('/product', (req, res) => {
    res. send('Update a product')
})

app.delete('/product', (req, res) => {
    res.send('Delete a product')
})

app.get('/users', (req, res) => {
    res. send('List of users')
})

app.use(express.json())
app.post('/users', (req, res) => {
    res.send('Create a user')
})

app.put('/users', (req, res) => {
    res.send('Update a user')
})

app.delete('/users', (req, res) => {
    res.send('Delete a user')
})

app.listen (port, () => {
    console.log(`local server working on ${port}`);
})