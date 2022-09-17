const router = require("express").Router();
const { MonitorBitCon } = require("../controllers/Monitor");
router.post("/", MonitorBitCon);
module.exports = router;
