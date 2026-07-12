import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import todoRouter from "./routes/todoRoutes.js";
import db_connection from "./config/dbConnection.js";
import dns from "dns"

dotenv.config()

// changing dns
dns.setServers(["1.1.1.1","8.8.8.8"])



const app = express();
// configure
app.use(cors({
  origin:["http://localhost:5173","https://fullstack-todo-app1.netlify.app"],
  methods:["GET","POST","PUT","PATCH","DELETE"]
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/',todoRouter)


const port = process.env.PORT || 8080

db_connection()
.then((db)=>{
    console.log(process.env.DEV_TYPE == "local" ? db.connection._connectionString : "db connected")

    app.listen(port, () => {
  console.log(process.env.PORT == "local" ? `server running on http://localhost:${port}` : "server running")
})
})
.catch((error)=>console.log("error",error.message))

