import TodoModel from "../model/todoModel.js";

export const createTodo = async function (req, res) {
  try {
    const { title, description } = req.body;

    const todoExist = await TodoModel.exists({ title: new RegExp(title, "i") });

    if (todoExist) {
      return res
        .status(409)
        .json({ status: false, message: "title already exist" });
    }

    if (
      !title ||
      !description ||
      title.trim().length <= 0 ||
      description.trim().length <= 0
    ) {
      return res
        .status(400)
        .json({ message: "all fields required", status: false });
    }

    const todo = await TodoModel.create({
      title: title,
      description: description,
    });
    (await todo).save();

    return res
      .status(201)
      .json({ status: true, message: "todo created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "failed to insert",
        status: false,
        error: error.message,
      });
  }
};

export const readTodo = async function (req, res) {
  try {

    const query = req.query;

    const {limit , page} = query;
    const skip = (page - 1) * limit;

    console.log({skip,limit,page})

    const data = await TodoModel.find().skip(skip).limit(limit);
    const totalCount = await TodoModel.find().countDocuments();
    console.log("total count",totalCount)
    return res
      .status(200)
      .json({ status: true, message: "todo fetched successfully", data: data ,totalTodoCount:totalCount});
  } catch (error) {
    return res
      .status(400)
      .json({
        status: false,
        message: "internal error while fetching todo",
        error: error.message,
      });
  }
};

export const getSingleTodo = async function (req, res) {
  try {
    const todoId = req.params.id;

    const todo = await TodoModel.findById(todoId);

    return res
      .status(200)
      .json({ status: true, message: "todo fetched successfully", data: todo });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: false,
        message: "failed to fetch",
        error: error.message,
      });
  }
};

export const updateTodo = async function (req, res) {
  try {
    const todoId = req.params.id;
    const { title, description } = req.body;

    // checking todo id exist or not
    const todoExist = await TodoModel.exists({ _id: todoId });
    if (!todoExist) {
      return res.status(404).json({ status: false, message: "Id not exist" });
    }

    const todo = await TodoModel.findByIdAndUpdate(
      todoId,
      { title: title, description: description },
      { new: true },
    );

    return res
      .status(200)
      .json({ status: true, message: "updated successfully", data: todo });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: false,
        message: "failed to update",
        error: error.message,
      });
  }
};

export const deleteTodo = async function (req, res) {
  try {
    const todoId = req.params.id;

    const todo = await TodoModel.findByIdAndDelete(todoId);

    if (!todo) {
      return res
        .status(404)
        .json({ status: false, message: " this todo not exist" });
    }

    return res
      .status(200)
      .json({ status: false, message: "deleted successfully", data: todo });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "fail to delete", error: error.message });
  }
};

export const changeTodoStatus = async function (req, res) {
  try {
    const todoId = req.params.id;
    const { isCompleted } = req.body;

    // checking todo id exist or not
    const todoExist = await TodoModel.exists({ _id: todoId });
    if (!todoExist) {
      return res.status(404).json({ status: false, message: "Id not exist" });
    }

    const todo = await TodoModel.findByIdAndUpdate(
      todoId,
      { isCompleted: isCompleted },
      { new: true },
    );

    return res
      .status(200)
      .json({ status: true, message: "todo status changed ", data: todo });
  } catch (error) {}
};
