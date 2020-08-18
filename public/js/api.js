const API = {
  //TESTER API
  //add new tester
  addTesters : async function (newTester) {
    return await $.ajax({
      url: "/api/testers",
      data: newTester,
      method: "POST"
    });
  },
//get all tester 
  getTesters : async function () {
    return await $.ajax({
      url: "/api/testers",
      method: "GET"
    })
  },
//delete tester
  deleteTester : async function (id) {
    return await $.ajax({
      url: "/api/testers/" + id,
      method: "DELETE"
    })
  },
//update tester
  updateTester : async function (id, newName) {
    return await $.ajax({
      url: "/api/testers/" + id,
      data: newName,
      method: "PUT"
    });
  },
//SCHEDULE API
//add new schedule
   postSchedule : async function (newSchedule) {
    return $.ajax({
        url: "/api/schedule",
        data: newSchedule,
        method: "POST"
    })
},
//get all schedule 
 getSchedule : async function () {
    return $.ajax({
        url: "/api/schedule",
        method: "GET"
    })
},
//delete a schedule
 deleteSchedule : async function (id) {
    return $.ajax({
        url: "/api/schedule/" + id,
        method: "DELETE"
    })
},
//update a schedule
 updateSchedule : async function (id, updatedSchedule) {
    return $.ajax({
        url: "/api/schedule/" + id,
        data: updatedSchedule,
        method: "PUT"
    })
}
};