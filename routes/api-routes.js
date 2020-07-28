
const router = require("express").Router();

const Testers = require("../models/testers");
const Schedule = require("../models/schedule")



router.post("/api/testers", ({body}, res) => {
  Testers.create(body)
    .then(dbTesters => {
      console.log(dbTesters)
      res.json(dbTesters);
    })
    .catch(err => {
        res.json(err);
      });
  });

router.get("/api/testers", (req, res)=>{
  Testers.find({})
    .then(dbTesters => {
      res.json(dbTesters);
    })
    .catch(err => {
      res.json(err);
    });
})


router.post("/api/schedule", ({body}, res) => {
  console.log(`body`)
  console.log(body)
  Schedule.create(body)
    .then(dbSchedule => {
      console.log(dbSchedule)
      res.json(dbSchedule);
    })
    .catch(err => {
        res.json(err);
      });
  });

  
module.exports = router


