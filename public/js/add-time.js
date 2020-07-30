$(document).ready(function(){
    let totalInputBoxes;

    let postSchedule =  function(newSchedule) {
        return  $.ajax({
            url: "/api/schedule",
            data: newSchedule,
            method: "POST"
        })
    }

    let getSchedule = function(){
        return $.ajax({
            url: "/api/schedule",
            method: "GET"
        })
    }

    $(`.dropdown-item`).click(function(e){
        e.stopPropagation()
        let totalInputBoxes = $(this).text()
        displayInputBoxOnDOM(totalInputBoxes);
        // $(`.dropdown-item`).dropdown('hide')

        $(`#submit-testers-btn`).click(function(e){
            console.log(`submit clicked`)
            e.stopPropagation();
            getAllTimeFromDOM(totalInputBoxes);
        })
    })

    async function displaySchedule(){

        let allSchedule = await getSchedule();

        for (let i = 0; i<allSchedule.length; i++){
            let time = allSchedule[i].totalDuration.map(function(time){
               return `<p class="time">${time}</p>`
            }).join(' ')
            console.log(time)

            let block= `
            <div class="schedule-block">
                <h2>${allSchedule[i].totalTesters}</h2>
                ${time}
            </div>`

            $(`.alltime-container`).append(block);
        }

    }
    displaySchedule();
            


    function displayInputBoxOnDOM(totalInputBoxes){
        $(`#input-boxes`).empty()
        for (let i = 0; i <totalInputBoxes; i++){
            const block = 
            `<form>
            <div class="form-row">
              <div class="col">
                <input type="text" id="start-time-${i}" class="form-control" placeholder="From">
              </div>
              <div class="col">
                <input type="text" id="end-time-${i}" class="form-control" placeholder="To">
              </div>
            </div>
          </form>`;
        
            $(`#input-boxes`).append(block)
        }
        $(`#input-boxes`).append(`<button id="submit-testers-btn" type="button" class=" btn btn-secondary">Submit</button>`)
    }

    function getAllTimeFromDOM(totalInputBoxes){
        console.log(`clicked`)
        let newSchedule  = {
            totalTesters: totalInputBoxes,
            totalDuration:[]
        }
        for (let i =0; i<totalInputBoxes; i++){
            newSchedule.totalDuration[i]= $(`input#start-time-${i}`).val() + "-" + $(`input#end-time-${i}`).val()

        }
        console.log(`new schedule`)
        console.log(newSchedule);

        let res = postSchedule(newSchedule);
        console.log(res)
    }

})