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

    function render(availableTesters, availableTime){
        
        for (i = 0; i< availableTesters.length; i++){
            const block = ` <div class="Tester-container">
            <div class="tester-name" id="${availableTesters[i]._id}">${availableTesters[i].name}</div>
            <div class="tester-time">${availableTime.totalDuration[i]}</div>
            <button class="remove-tester-btn" id="${availableTesters[i]._id}" type="button" class="remove-btn btn btn-danger">Absent</button>
            </div>
            `
            $(`.schedule-container`).append(block)
        }
    }

     async function display(){
        let availableTesters =  await getAvailableTesters(true)
        console.log(`availableTesters`)
        console.log(availableTesters)
        let availableTime = await getTimes(availableTesters.length)
        console.log(availableTime)
        render(availableTesters, availableTime)

     }

     function removeTester(){
         $(`.remove-tester-btn`).click()
         const btnId = this.id
     }

     function updateTester(){
        return  $.ajax({
            url: "/api/schedule/" + numOfTesters,
            method: "GET"
        })
     }


     display();



    // //ADD NEW TESTER
    // $(`#add-tester-btn`).click(function(){
    //     console.log(`clicked`);
    //     let newTester = {
    //         name: $(`#add-tester-input`).val(),
    //         available: true
    //     }
    //     addTesters(newTester);
    //     displayTesters();
    // })

    // //GET AND DISPLAY TESTERS
    // async function displayTesters(){
    //     let testers = await getTesters()
    //     console.log(testers)
    //     $(`.testers`).empty()

    //     testers.forEach(tester => {
    //         const block = `<h2> ${tester.name}</h2>`
    //         $(`.testers`).append(block)
    //     });
    // }
    // displayTesters();





})