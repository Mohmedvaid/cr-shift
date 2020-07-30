
const router = require("express").Router();

const Testers = require("../models/testers");
const Schedule = require("../models/schedule")


// ADD TESTERS TO THE DB
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
  
//GET ALL TESTERS FROM DB
router.get("/api/testers", (req, res)=>{
  Testers.find({})
    .then(dbTesters => {
      res.json(dbTesters);
    })
    .catch(err => {
      res.json(err);
    });
})

// ADD A SHIFT TO DB
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

  // GET ALL SHIFTS
  router.get("/api/schedule", (req, res)=>{
    Schedule.find({})
      .then(dbSchedule => {
        res.json(dbSchedule);
      })
      .catch(err => {
        res.json(err);
      });
  })

  // GET ONLY ONE SHIFT ACCORDING TO TESTERS AVAILABLE 
  router.get("/api/schedule/:availableTester", (req, res)=>{
    const availableTesters = req.params.availableTester;
    console.log(`available testers`)
    console.log(availableTesters)

    Schedule.findOne({totalTesters: availableTesters})
      .then(todayShift =>{
        res.json(todayShift);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // GET TESTERS ACCORDING TO AVAILIBILITY
  router.get("/api/testers/:availibility", (req, res)=>{
    const availibility = req.params.availibility;
    console.log(`available`)
    console.log(availibility)

    Testers.find({available: availibility})
      .then(availableTesters=>{
        res.json(availableTesters)
      })
      .catch(err => {
        res.json(err);
      });
  })

  //UPDATE THE TESTER AVAILIBILITY
  router.put("/api/tester/update/:id", (req, res)=>{
    const id= req.params.id

    Testers.findOneAndUpdate({_id: id}, {available: false})
      .then(updatedTesters=>{
        res.json(updatedTesters)
      })
      .catch(err => {
        res.json(err);
      });
  })

  //UPDATE THE TESTER AVAILIBILITY
  router.put("/api/updateall", (req, res)=>{

    Testers.updateMany({available: false}, {available: true})
      .then(allTesters=>{
        res.json(allTesters)
      })
      .catch(err => {
        res.json(err);
      });
  })

  router.delete("/api/tester/:id", (req, res)=>{
    const id = req.params.id;

    Testers.deleteOne({_id: id})
    .then(updatedTesters=>{
      res.json(updatedTesters)
    })
    .catch(err => {
      res.json(err);
    });
  })
  
module.exports = router


