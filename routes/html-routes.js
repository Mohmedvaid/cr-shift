const router = require("express").Router();
const path  =require("path");

router.get("/", (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "../public/html/index.html"))
});

router.get("/testers", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/add-testers.html"))
});

router.get("/time", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/add-time.html"))
});
module.exports = router;