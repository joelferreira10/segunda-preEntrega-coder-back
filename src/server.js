import express from 'express'
import morgan from 'morgan'
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import './daos/mongodb/connection.js'


const app=express()
// const serverHTTP=app.listen(8080,()=>console.log("server ok, port 8080"))
// const io=new Server(serverHTTP)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.listen(8080,()=>console.log("server ok, port 8080"))
// app.engine('handlebars',handlebars.engine())
// app.set('views',__dirname+'/views')
// app.set('view engine','handlebars')

// app.use(express.static(__dirname+'/public'))
app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)
