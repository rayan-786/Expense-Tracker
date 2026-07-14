const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const {

  getCategories,

  getCategoryById,

  createCategory,

  updateCategory,

  deleteCategory

} = require("../controllers/category.controller");

router.get("/", verifyToken, getCategories);


router.get(

  "/:id",

  verifyToken,

  getCategoryById

);


router.post(

  "/",

  verifyToken,

  createCategory

);



router.put(

  "/:id",

  verifyToken,

  updateCategory

);


router.delete(

  "/:id",

  verifyToken,

  deleteCategory

);

module.exports = router;