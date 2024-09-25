"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIp = getIp;
exports.getDate = getDate;
function getIp(req) {
    return req.headers["x-forwarded-for"];
}
function getDate() {
    var today = new Date();
    return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
}
