import mongoose from "mongoose";

const connectionString='mongodb+srv://ferreirajoel93:coder2023@cluster-coder.bszhjga.mongodb.net/Ecommerce'

try {
    await mongoose.connect(connectionString)
    console.log('conectado a la base de datos de MongoDB')
} catch (error) {
    console.log(error)
}