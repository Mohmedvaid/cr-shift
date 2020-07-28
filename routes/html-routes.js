const router = require("express").Router();
const path  =require("path");

router.get("/", (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "../public/html/index.html"))
});

router.get("/add", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/add.html"))
});

router.get("/update", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/update.html"))
});
module.exports = router;