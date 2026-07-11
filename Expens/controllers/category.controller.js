const db = require("../config/db");

exports.createCategory = async (req, res) => {

  try {

    let {

      name,

      type

    } = req.body;

    name = name?.trim();

    if (!name || !type) {

      return res.status(400).json({

        success: false,

        message: "Name and type are required."

      });

    }

    if (!["income", "expense"].includes(type)) {

      return res.status(400).json({

        success: false,

        message: "Invalid category type."

      });

    }

    const exists = await db("categories")

      .whereRaw("LOWER(name)=?", [name.toLowerCase()])

      .where("type", type)

      .first();

    if (exists) {

      return res.status(409).json({

        success: false,

        message: "Category already exists."

      });

    }

    const [id] = await db("categories").insert({

      name,

      type

    });

    const category = await db("categories")

      .where("id", id)

      .first();

    return res.status(201).json({

      success: true,

      message: "Category created successfully.",

      data: category

    });

  }

  catch (error) {

    console.error("Create Category Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

exports.getCategories = async (req, res) => {
  try {

    const { type } = req.query;

    let query = db("categories")
      .select(
        "id",
        "name",
        "type"
      );

    if (type) {

      if (!["income", "expense"].includes(type)) {

        return res.status(400).json({
          success: false,
          message: "Invalid category type."
        });

      }

      query.where("type", type);

    }

    const categories = await query
      .orderBy("name", "asc");

    return res.status(200).json({

      success: true,

      message: "Categories fetched successfully.",

      total: categories.length,

      data: categories

    });

  } catch (error) {

    console.error("Category Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }
};

exports.getCategoryById = async (req, res) => {

  try {

    const { id } = req.params;

    const category = await db("categories")

      .where("id", id)

      .first();

    if (!category) {

      return res.status(404).json({

        success: false,

        message: "Category not found."

      });

    }

    return res.status(200).json({

      success: true,

      data: category

    });

  }

  catch (error) {

    console.error("Get Category Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

exports.updateCategory = async (req, res) => {

  try {

    const { id } = req.params;

    let {

      name,

      type

    } = req.body;

    name = name?.trim();

    if (!name || !type) {

      return res.status(400).json({

        success: false,

        message: "Name and type are required."

      });

    }

    if (!["income", "expense"].includes(type)) {

      return res.status(400).json({

        success: false,

        message: "Invalid category type."

      });

    }

    const category = await db("categories")

      .where("id", id)

      .first();

    if (!category) {

      return res.status(404).json({

        success: false,

        message: "Category not found."

      });

    }

    const duplicate = await db("categories")

      .whereRaw("LOWER(name)=?", [name.toLowerCase()])

      .where("type", type)

      .whereNot("id", id)

      .first();

    if (duplicate) {

      return res.status(409).json({

        success: false,

        message: "Category already exists."

      });

    }

    await db("categories")

      .where("id", id)

      .update({

        name,

        type,

        updated_at: db.fn.now()

      });

    const updated = await db("categories")

      .where("id", id)

      .first();

    return res.status(200).json({

      success: true,

      message: "Category updated successfully.",

      data: updated

    });

  }

  catch (error) {

    console.error("Update Category Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};

exports.deleteCategory = async (req, res) => {

  try {

    const { id } = req.params;

    const category = await db("categories")

      .where("id", id)

      .first();

    if (!category) {

      return res.status(404).json({

        success: false,

        message: "Category not found."

      });

    }

    await db("categories")

      .where("id", id)

      .del();

    return res.status(200).json({

      success: true,

      message: "Category deleted successfully."

    });

  }

  catch (error) {

    console.error("Delete Category Error :", error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error."

    });

  }

};