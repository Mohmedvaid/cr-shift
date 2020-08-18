const router = require("express").Router();
const giphyRoutes = require("./api-giphy");
const scheduleRoutes = require("./api-schedule");
const testerRoutes = require("./api-testers");


// ===== ROUTES =====
router.use("/api/testers", testerRoutes);
router.use("/api/schedule", scheduleRoutes);
router.use("/api/gif", giphyRoutes);

module.exports = router;