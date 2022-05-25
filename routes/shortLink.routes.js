const express = require("express");
const router = express.Router();

const shortLinkController = require('../controllers/shortLinkController')

/* Encodes a URL to a shortened URL. */
router.post("/encode", shortLinkController.encodeURL)
/* Decode a URL to a shortened URL. */
router.get("/decode", shortLinkController.decodeURL)
/* Statistics of URL. */
router.get("/statistic/:urlPath", shortLinkController.statisticURL)

module.exports = router;