const multer = require("multer");

/* =========================================================
   FILE FILTER
========================================================= */

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only JPG, JPEG, PNG and PDF files are allowed."
            ),
            false
        );
    }
};

/* =========================================================
   MULTER CONFIG
========================================================= */

const upload = multer({
    // Vercel serverless environment ke liye
    // files ko local disk par save nahi karenge.
    storage: multer.memoryStorage(),

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
});

module.exports = upload;