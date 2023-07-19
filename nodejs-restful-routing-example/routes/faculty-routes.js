const express = require("express");
const router = express.Router();

// 查詢所有教職員資料students
router.get("/", (req, res) => {
  res.send("歡迎來到教職員的首頁");
  //   try {
  //     let studentData = await Student.find().exec();
  //     // return res.send(studentData);
  //     return res.render("students", { studentData });
  //   } catch (err) {
  //     return res.status(500).send("尋找資料時發生錯誤！");
  //   }
});

router.get("/new", (req, res) => {
  res.send("歡迎來到新增教職員的頁面");
});

module.exports = router;
