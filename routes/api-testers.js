const router = require("express").Router();
const Testers = require("../models/testers");



//==============TESTERS==============//
// ADD TESTERS TO THE DB
router.post("/", ({
    body
  }, res) => {
    Testers.create(body)
      .then(dbTesters => {
        console.log(dbTesters)
        res.json(dbTesters);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  //GET ALL TESTERS FROM DB
  router.get("/", (req, res) => {
    Testers.find({})
      .then(dbTesters => {
        res.json(dbTesters);
      })
      .catch(err => {
        res.json(err);
      });
  })
  
  
  
  // GET TESTERS ACCORDING TO AVAILIBILITY
  router.get("/:availibility", (req, res) => {
    const availibility = req.params.availibility;
    console.log(`available`)
    console.log(availibility)
  
    Testers.find({
        available: availibility
      })
      .then(availableTesters => {
        res.json(availableTesters)
      })
      .catch(err => {
        res.json(err);
      });
  })
  
  //UPDATE THE TESTER AVAILIBILITY
  router.put("/update/:id", (req, res) => {
    const id = req.params.id
  
    Testers.findOneAndUpdate({
        _id: id
      }, {
        available: false
      })
      .then(updatedTesters => {
        res.json(updatedTesters)
      })
      .catch(err => {
        res.json(err);
      });
  })
  
  //UPDATE ALL TESTER TO AVAILABLE
  router.put("/updateall", (req, res) => {
  
    Testers.updateMany({
        available: false
      }, {
        available: true
      })
      .then(allTesters => {
        res.json(allTesters)
      })
      .catch(err => {
        res.json(err);
      });
  })
  
  //UPDATE THE TESTER NAME
  router.put("/:id", (req, res) => {
    const id = req.params.id
    const newName = req.body.name
  
    Testers.findOneAndUpdate({
        _id: id
      }, {
        name: newName
      })
      .then(updatedTesters => {
        res.json(updatedTesters)
      })
      .catch(err => {
        res.json(err);
      });
  })
  
  //DELETE TESTER
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
  
    Testers.deleteOne({
        _id: id
      })
      .then(updatedTesters => {
        res.json(updatedTesters)
      })
      .catch(err => {
        res.json(err);
      });
  })

  module.exports = router;