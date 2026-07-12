import mongoose from "mongoose";

 async function db_connection()
{
const DB_URL = process.env.DB_URL
const db = await mongoose.connect(DB_URL)
return db
}

export default db_connection