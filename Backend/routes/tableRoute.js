const express = require("express");
const {createTable,updateRow,deleteRow,getRows,mail} = require("../controllers/tableController");

const router = express.Router();

router.route("/create").post(createTable);

router.route("/update").put(updateRow);

router.route("/delete/:id").delete(deleteRow);

router.route("/all").get(getRows);

router.route("/mail").post(mail);

module.exports = router;