const express = require ('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(bodyParser.json())

const products = [
    { id: 1, nombre: 'Taza de Harry Potter' , precio: 300 },
    { id: 2, nombre: 'FIFA 22 PS5' , precio: 1000 },
    { id: 3, nombre: 'Figura Goku Super Saiyan' , precio: 100 },
    { id: 4, nombre: 'Zelda Breath of the Wild', precio: 200 },
    { id: 5, nombre: 'Skin Valorant', precio: 120 },
    { id: 6, nombre: 'Taza de Star Wars', precio: 220 },
]

//Endpoint para lista de productos:
app.get('/products', (req, res) => {
	res.json({
        description: 'Productos',
        item: products
    })
})

//Endpoint para crear un producto nuevo:
app.post('/products/newProduct', (res,req) => {
    const { nombre, precio } = req.body
    const newProduct = {
        id: products.length + 1,
        nombre,
        precio,
    }
    if(!nombre || !precio) {
        res.status(400).send('field required')
    } else {
        products.push(newProduct)
        res.status(201).send({
            message: 'everything ok',
            products,
        })
    }
})

//Endpoint para actualizar un producto:
app.put('/products/id/:id', (req,res) => {
    const found = products.some((product) => product.id === +req.params.id)
    if(found) {
       products.forEach((product) => {
        if(product.id == req.params.id) {
            product.nombre = req.body.nombre ? req.body.nombre : product.nombre
            product.precio = req.body.precio ? req.body.precio : product.precio
            res.send(product)
        }
        })
    } else {
        res.status(400).send({ message: 'error'})
    } 
})

//Endpoint para eliminar un producto:
app.delete('/products/id/:id', (req, res) => {
    const found = products.some((product) => product.id == +req.params.id)
    if(found) {
        const deleteProduct = products.filter((product) => product.id != req.params.id)
        res.status(202).send(deleteProduct)
    } else {
        res.status(400).send({message:'Not found'})
    }
})

//Filtro por precio de producto, incluyendo la horquilla entre 50 y 250:
app.get('/products/filter/price/:min/:max', (req, res) => {
    const min = parseInt(req.params.min)
    const max = parseInt(req.params.max)
    const filteredProducts = products.filter(
        (product) => product.precio >= min && product.precio <=max
    )
    res.json(filteredProducts);
})

//Filtro que cuando busque en postman por parámetro el id de un producto me devuelva ese producto:
app.get('/products/filter/id/:id', (req, res) => {
    const productID = parseInt(req.params.id)
    const foundProduct = products.find(
        (product) => product.id === productID)
        if(foundProduct) {
            res.json(foundProduct)
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
})

//filtro que cuando busque en postman por parámetro el nombre de un producto me devuelva ese producto:
app.get('/products/filter/name/:name', (req,res) => {
    const productName = req.params.name
    const foundProduct = products.find(
        (product) => product.nombre.toLowerCase() === productName.toLowerCase
    )
    if(foundProduct) {
        res.json(foundProduct)
    } else {
        res.status(404).json({ error: 'Producto no encontrado' })
    }
})


app.listen(PORT, () => {
    console.log(`server working on port ${PORT}`);
})