const router = require("express").Router();
const Schedule = require("../models/schedule")



//==============SCHEDULE==============//
// GET ONLY ONE SHIFT ACCORDING TO TESTERS AVAILABLE 
router.get("/:availableTester", (req, res) => {
  const availableTesters = req.params.availableTester;
  console.log(`available testers`)
  console.log(availableTesters)

  Schedule.findOne({
      totalTesters: availableTesters
    })
    .then(todayShift => {
      res.json(todayShift);
    })
    .catch(err => {
      res.json(err);
    });
});
// ADD A SHIFT TO DB
router.post("/", ({
  body
}, res) => {
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

// GET ALL SHIFTS
router.get("/", (req, res) => {
  Schedule.find({})
    .then(dbSchedule => {
      res.json(dbSchedule);
    })
    .catch(err => {
      res.json(err);
    });
})

router.put("/:id", (req, res) => {
  const id = req.params.id;
  console.log(`REQ`)
  console.log(req.body)

  Schedule.findOneAndUpdate({
      _id: id
    }, {
      totalDuration: req.body.totalDuration
    })
    .then(updatedSchedule => {
      res.json(updatedSchedule)
    })
    .catch(err => {
      res.json(err);
    });
})


router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Schedule.deleteOne({
      _id: id
    })
    .then(updatedSchedule => {
      res.json(updatedSchedule)
    })
    .catch(err => {
      res.json(err);
    });
})



module.exports = router