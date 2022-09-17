const router = require("express").Router();
const { MonitorBitCon } = require("../controllers/Monitor");
router.get("/", MonitorBitCon);
module.exports = router;
