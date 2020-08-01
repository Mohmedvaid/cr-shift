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

    let updateTester = function(testerId){
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

     let getGIF = function(gifName){
         return $.ajax({
             url: "/api/gif/" + gifName,
             method: "GET"
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
        if(!availableTime){
            let gifData = await getGIF(`ohno`)
            let gifURL = gifData.data.images.original.url;
            let message = `Oh no! Looks like availibility of testers does not match available time!`
            let block = showError(gifURL, message);
            $(`.container-main`).empty().append(block);
        }else{
            render(availableTesters, availableTime)
        }
     }
    
     function showError(img, message){
        let block = `
        <div class="card" style="width: 18rem;">
        <img src="${img}" class="card-img-top" alt="Error">
        <div class="card-body">
            <p class="card-text">${message}</p>
        </div>
        </div>`
        return block;
     }

     //REMOVE AND UPDATE DOM   
     $(document).on('click', '.remove-tester-btn', function(){ 
        console.log(this.id);
        updateTester(this.id);
        $(`.schedule-container`).empty();
        display();
   });

   $(`.reset-btn`).click(async function(){
       let updated = await updateAllTester();
       display();

   })


     display();





})