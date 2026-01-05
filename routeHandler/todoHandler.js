const express = require("express");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const mongoose = require("mongoose");

// model
const Todo = new mongoose.model("Todo", todoSchema);

// get all the TODOS
router.get("/", async (req, res) => {
  try {
    // const data = await Todo.find({});
    const data = await Todo.find(
      {},
      {
        _id: 0,
        __v: 0,
        data: 0,
      }
    ).limit(1);
    res.status(200).json({
      message: "all todo",
      data: data, // 👈 now you can send data
      meta: {
        totalItems: data.length ?? 0,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// Get a TODO by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });

    res.status(200).json({
      message: "all todo",
      data: data, // 👈 now you can send data
      meta: {
        totalItems: data.length ?? 0,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// Post A TODO
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);

  await newTodo
    .save()
    .then(() => {
      res.status(200).json({
        message: "Todo was inserted successfully!",
      });
    })
    .catch(() => {
      res.status(500).json({
        error: "There was a server side error",
      });
    });
});

// Post Multiple TODO
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body)
    .then(() => {
      res.status(200).json({
        message: "Todo was inserted successfully!",
      });
    })
    .catch(() => {
      res.status(500).json({
        error: "There was a server side error",
      });
    });
});

// Put Multiple TODO
router.put("/:id", async (req, res) => {
  //   await Todo.updateOne(
  //     { _id: req.params.id },
  //     {
  //       $set: {
  //         status: req.body.status ?? "active",
  //       },
  //     }
  //   )
  //   await Todo.findByIdAndUpdate(
  //     { _id: req.params.id },
  //     {
  //       $set: {
  //         status: req.body.status ?? "active",
  //       },
  //     }
  //   ).then(() => {
  //         // console.log(data)
  //       res.status(200).json({
  //         message: "Todo was updated successfully!",
  //       });
  //     })
  //     .catch(() => {
  //       res.status(500).json({
  //         error: "There was a server side error",
  //       });
  //     });

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: req.body.status ?? "active",
        },
      },
      { new: true } // returns updated document
    );

    res.status(200).json({
      message: "Todo was updated successfully!",
      data: updatedTodo, // 👈 now you can send data
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// Delete TODO
router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: "deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

module.exports = router;
