/* =========================================================
   LOGGER MIDDLEWARE
========================================================= */

const logger = (req, res, next) => {

  const start = Date.now();

  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    req.ip;

  const browser = req.headers["user-agent"];

  /* =========================================================
     HIDE SENSITIVE DATA
  ========================================================= */

  const body = { ...req.body };

  if (body.password) body.password = "********";
  if (body.confirmPassword) body.confirmPassword = "********";
  if (body.oldPassword) body.oldPassword = "********";
  if (body.newPassword) body.newPassword = "********";
  if (body.token) body.token = "********";
  if (body.otp) body.otp = "******";

  /* =========================================================
     REQUEST LOG
  ========================================================= */

  if (process.env.NODE_ENV !== "production") {

    console.log("\n============================================================");
    console.log("🚀 API REQUEST");
    console.log("============================================================");
    console.log(`📅 Time        : ${new Date().toLocaleString()}`);
    console.log(`🌐 Method      : ${req.method}`);
    console.log(`🔗 Endpoint    : ${req.originalUrl}`);
    console.log(`📍 IP Address  : ${ip}`);
    console.log(`🖥️ User Agent  : ${browser}`);
    console.log("------------------------------------------------------------");
    console.log("📦 Params      :", req.params);
    console.log("❓ Query       :", req.query);
    console.log("📄 Body        :", body);

  }

  /* =========================================================
     RESPONSE LOG
  ========================================================= */

  res.on("finish", () => {

    const ms = Date.now() - start;

    if (process.env.NODE_ENV !== "production") {

      console.log("------------------------------------------------------------");
      console.log(`✅ Status      : ${res.statusCode}`);
      console.log(`⏱️ Response    : ${ms} ms`);
      console.log("============================================================\n");

    }

  });

  next();

};

module.exports = logger;