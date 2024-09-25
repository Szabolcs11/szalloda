"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)({ mergeParams: true });
router.get("/", async (req, res) => {
    return res.send("Hello from loginUser");
});
exports.default = router;
