$(document).ready(function () {

    //API CALLS 

    let getAvailableTesters =  function(availibility) {
        return  $.ajax({
            url: "/api/testers/" + availibility,
            method: "GET"
        })
    }

    let getTimes = function(numOfTesters){
        return  $.ajax({
            url: "/api/schedule/" + numOfTesters,
            method: "GET"
        })
    }

    let updateTester= function(testerId){
        return  $.ajax({
            url: "/api/tester/update/" + testerId,
            method: "PUT"
        })
     }

     let updateAllTester= function(){
        return  $.ajax({
            url: "/api/updateall",
            method: "PUT"
        })
     }


    function render(availableTesters, availableTime){
        
        for (i = 0; i< availableTesters.length; i++){
            const block = ` <div class="Tester-container">
            <div class="tester-name" id="${availableTesters[i]._id}">${availableTesters[i].name}</div>
            <div class="tester-time">${availableTime.totalDuration[i]}</div>
            <button id="${availableTesters[i]._id}" type="button" class="remove-tester-btn remove-btn btn btn-danger">Absent</button>
            </div>
            `
            $(`.schedule-container`).append(block)
        }
    }

    //RENDER FUNCTION
     async function display(){
        $(`.schedule-container`).empty();
        let availableTesters =  await getAvailableTesters(true)
        console.log(`availableTesters`)
        console.log(availableTesters)
        let availableTime = await getTimes(availableTesters.length)
        console.log(availableTime)
        render(availableTesters, availableTime)

     }

     //REMOVE AND UPDATE DOM   
     $(document).on('click', '.remove-tester-btn', function(){ 
        console.log(this.id);
        updateTester(this.id);
        $(`.schedule-container`).empty();
        display();
   });

   $(`.reset-btn`).click(function(){
       updateAllTester();
       display();

   })





     display();





})