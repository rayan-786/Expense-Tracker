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

/* =========================================================
   GET ALL CATEGORIES
   GET /api/categories
   GET /api/categories?type=income
   GET /api/categories?type=expense
========================================================= */

router.get(

  "/",

  verifyToken,

  getCategories

);

/* =========================================================
   GET CATEGORY BY ID
   GET /api/categories/:id
========================================================= */

router.get(

  "/:id",

  verifyToken,

  getCategoryById

);

/* =========================================================
   CREATE CATEGORY
   POST /api/categories
========================================================= */

router.post(

  "/",

  verifyToken,

  createCategory

);

/* =========================================================
   UPDATE CATEGORY
   PUT /api/categories/:id
========================================================= */

router.put(

  "/:id",

  verifyToken,

  updateCategory

);

/* =========================================================
   DELETE CATEGORY
   DELETE /api/categories/:id
========================================================= */

router.delete(

  "/:id",

  verifyToken,

  deleteCategory

);

module.exports = router;