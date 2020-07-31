$(document).ready(function(){
    let totalInputBoxes;
    let allSchedule;

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

    let deleteSchedule = function(id){
        return $.ajax({
            url:"/api/schedule/"+ id,
            method: "DELETE"
        })
    }

    let updateSchedule =  function(id, updatedSchedule) {
        console.log(`naja`)
        console.log(updatedSchedule);
        return  $.ajax({
            url: "/api/schedule/" + id,
            data: updatedSchedule,
            method: "PUT"
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

    $(document).on(`click`, `.delete-time-btn`, function(){
         deleteSchedule(this.id);
         console.log(`id`)
         console.log(this.id)
        $(`.alltime-container`).empty();
        displaySchedule();

    })

    $(document).on(`click`, `.update-time-btn`,  function(){
        const id = this.id
        $(`.update-container`).empty();
        let totalInputBoxes = editTime(id)
        $(document).on(`click`, `.update-current-time-btn`,  function(){
            const updatedSchedule = getUpdatedTimeFromDOM(totalInputBoxes);
            console.log(`updated schedule before posting`);
            console.log(updatedSchedule)
            const obj = {
                totalDuration: updatedSchedule
            }

          let response =  updateSchedule( id, obj);
          console.log(response)
            $(`.alltime-container`).empty();
            displaySchedule();

        })
        
        
        console.log(allSchedule)
    })

    // function populateAddNewScheduleDDL(allSchedule){
    //     for(let i = 0; i<allSchedule.length; i++){
    //         allSchedule[i].map((schedule, index)=>{
    //             console.log(schedule.totalTesters)
    //         })

    //     }
    // }

    function getUpdatedTimeFromDOM(totalInputBoxes){
        let totalDuration=[];

        for (let i =0; i<totalInputBoxes; i++){
            totalDuration[i]= $(`input#start-time-${i}`).val() + "-" + $(`input#end-time-${i}`).val()
        }
        return totalDuration;

    }

    function editTime(id){
        
        for(let i = 0; i<allSchedule.length; i++){
            if(id == allSchedule[i]._id){
                allSchedule[i].totalDuration.map(function(time, index){
                    const mainTime = time.split("-");
                    const fromTime = mainTime[0];
                    const toTime = mainTime[1];
                    const block = `    
                    <form>
                        <div class="form-row">
                        <div class="col">
                            <input value="${fromTime}" type="text" id="start-time-${index}" class="form-control" placeholder="From">
                        </div>
                        <div class="col">
                            <input value="${toTime}" type="text" id="end-time-${index}" class="form-control" placeholder="To">
                        </div>
                        </div>
                    </form>`
                    $(`.update-container`).append(block)
                    
                })
                $(`.update-container`).append(`<button type="button" class="update-current-time-btn btn btn-warning">Update</button>`)
                
                return allSchedule[i].totalTesters;
            }
        }
    }


    async function displaySchedule(){

         allSchedule = await getSchedule();
         console.log(allSchedule)

        for (let i = 0; i<allSchedule.length; i++){
            let time = allSchedule[i].totalDuration.map((time, index)=>{
                const totalTime = time.split(`-`)
               return `                
               <tr>
               <th scope="row">${index+1}</th>
               <td>${totalTime[0]}</td>
               <td>${totalTime[1]}</td>
               </tr>`
            }).join(' ')

            let block= `
            <p class="testing-schedule"> Schedule for ${allSchedule[i].totalTesters} testers</p>
            <div class="schedule-block">
            <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                </tr>
            </thead>
            <tbody>
            ${time}
            </tbody>
            </table>
            <div class="main-buttons">
                <button id="${allSchedule[i]._id}" type="button" class="update-time-btn btn btn-success">Edit</button>
                <button id="${allSchedule[i]._id}" type="button" class="delete-time-btn btn btn-danger">Delete</button>
            </div>
            </div>`

            $(`.alltime-container`).append(block);
        }
        populateAddNewScheduleDDL();
    }
    displaySchedule();

    function populateAddNewScheduleDDL(){
           const existingShifts= allSchedule.map((schedule, index)=>{
                return schedule.totalTesters
            })

            for(let i = 1; i<15; i++){
                for(let j = 0; j<existingShifts.length; j++){

                    if(i!=existingShifts[j]){
                        check = true;
                    }else{
                        check = false;
                        break;
                    }
                }
                if(check){
                    const block = `<button class="dropdown-item" type="button">${i}</button>`
                    $(`.testers-ddl`).append(block);
                    check = false;
                }
            }
    }
    
            


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