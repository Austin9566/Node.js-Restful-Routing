const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// 查詢所有學生資料students
router.get("/", async (req, res) => {
  try {
    let studentData = await Student.find().exec();
    // return res.send(studentData);
    return res.render("students", { studentData });
  } catch (err) {
    return res.status(500).send("尋找資料時發生錯誤！");
  }
});

router.get("/new", async (req, res) => {
  return res.render("new-student-form");
});

// 根據學生 ID 查詢學生資料
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let searchStudentData = await Student.findOne({ _id: id }).exec();
    if (searchStudentData != null) {
      // return res.send(searchStudentData);
      return res.render("student-page", { searchStudentData });
    } else {
      return res.render("student-not-found");
    }
  } catch (err) {
    return res.status(400).render("student-not-found");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    let searchStudentData = await Student.findOne({ _id: id }).exec();
    if (searchStudentData != null) {
      // return res.send(searchStudentData);
      return res.render("edit-student-form", { searchStudentData });
    } else {
      return res.render("student-not-found");
    }
  } catch (err) {
    return res.status(400).render("student-not-found");
  }
});

// 新增學生資料
router.post("/", async (req, res) => {
  try {
    let { name, age, major, merit, other } = req.body;
    let newStudent = new Student({
      name,
      age,
      major,
      scholarship: { merit, other },
    });
    let saveStudent = await newStudent.save();
    return res.render("student-save-success", { saveStudent });
    // return res.send({
    //   msg: "資料已新增成功！",
    //   saveObject: saveStudent,
    // });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

// 更新學生資料
router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { name, age, major, merit, other } = req.body;
    let updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        age,
        major,
        scholarship: { merit, other },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.render("student-update-success", { updatedStudent });
    // return res.send({
    //   msg: "資料已更新成功！",
    //   updatedData: updatedStudent,
    // });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

// 部分更新學生資料
router.patch("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { name, age, major, merit, other } = req.body;

    let updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        age,
        major,
        "scholarship.merit": merit,
        "scholarship.other": other,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send({ msg: "資料已更新成功！", updatedData: updatedStudent });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

// 刪除學生資料
router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deleteResult = await Student.findOneAndDelete({ _id: id });
    console.log(deleteResult);
    return res.render("student-delete-success", { deleteResult });
    // return res.send({
    //   msg: "您已將這筆資料刪除！",
    //   deleteResult: deleteResult,
    // });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;