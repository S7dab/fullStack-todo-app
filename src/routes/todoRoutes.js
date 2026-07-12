import express from "express";
import { changeTodoStatus, createTodo, deleteTodo, getSingleTodo, readTodo, updateTodo } from "../controllers/todoControllers.js";

const todoRouter = express.Router()


// create todo 
todoRouter.post('/todo', createTodo)

// read todo
todoRouter.get('/todo', readTodo)

// read single todo 
todoRouter.get('/todo/:id',getSingleTodo)

// update todo
todoRouter.put('/todo/:id',updateTodo )

// change status todo or PATCH
todoRouter.patch('/todo/:id',changeTodoStatus )

// delete todo
todoRouter.delete('/todo/:id', deleteTodo )

export default todoRouter