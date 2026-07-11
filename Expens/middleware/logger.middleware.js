const logger = (req, res, next) => {

  const start = Date.now();

  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    req.ip;

  const browser = req.headers["user-agent"];

  // Hide Password
  const body = { ...req.body };

  if (body.password) body.password = "********";

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

  res.on("finish", () => {

    const ms = Date.now() - start;

    console.log("------------------------------------------------------------");
    console.log(`✅ Status      : ${res.statusCode}`);
    console.log(`⏱️ Response    : ${ms} ms`);
    console.log("============================================================\n");

  });

  next();

};

module.exports = logger;