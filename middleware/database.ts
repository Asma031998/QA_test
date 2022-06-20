import mongoose from 'mongoose'

let uri = process.env.MONGODB_URI || ''
let dbName = process.env.MONGODB_DB


if (!uri) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local.local'
    )
}

if (!dbName) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env.local'
    )
}


const connectMongo = async () => mongoose.connect(uri)

export default connectMongo
