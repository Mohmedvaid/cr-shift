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

    $(document).on(`click`, `.dropdown-item`, function(e){
        console.log(`clicked`)
        e.stopPropagation()
        let totalInputBoxes = $(this).text()
        console.log(totalInputBoxes)
        displayInputBoxOnDOM(totalInputBoxes);


        $(`#submit-testers-btn`).click(function(e){
            console.log(`submit clicked`)
            e.stopPropagation();
            getAllTimeFromDOM(totalInputBoxes);
            $(`.alltime-container`).empty();
            displaySchedule();
            $(`#input-boxes`).empty();

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
        let totalInputBoxes = editTime(id);
        scrollTo(`.update-container`);

        $(document).on(`click`, `.update-current-time-btn`,  function(){
            const updatedSchedule = getUpdatedTimeFromDOM(totalInputBoxes);
            const obj = {
                totalDuration: updatedSchedule
            }

          let response =  updateSchedule( id, obj);
            $(`.alltime-container`).empty();
            displaySchedule();

        })
    })

    function scrollTo(element){
        $([document.documentElement, document.body]).animate({
            scrollTop: $(element).offset().top
        }, 1000);
    }


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
        $(`.testers-ddl`).empty();
        populateAddNewScheduleDDL();
    }

    function populateAddNewScheduleDDL(){
           const existingShifts= allSchedule.map((schedule, index)=>{
                return schedule.totalTesters
            })
            if(existingShifts.length === 0){
                $(`.testers-ddl`).append(`<button class="dropdown-item" type="button">1</button>`);
                return;
            }

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
            `<form class="animate__animated animate__backInRight add-form">
            <div class="form-row">
              <div class="col each-input-box">
                <input style="text-align: center;" type="text" id="start-time-${i}" class="form-control add-new-input-box" placeholder="From">
              </div>
              <div class="col each-input-box ">
                <input style="text-align: center;" type="text" id="end-time-${i}" class="form-control add-new-input-box" placeholder="To">
              </div>
            </div>
          </form>`;
        
            $(`#input-boxes`).append(block)
        }
        $(`#input-boxes`).prepend(`<p class="add-new-text">Add New Schedule for ${totalInputBoxes} Testers!`)
        $(`#input-boxes`).append(`<button id="submit-testers-btn" type="button" class=" btn btn-secondary animate__animated animate__backInLeft ">Submit</button>`)
    }

    function getAllTimeFromDOM(totalInputBoxes){
        let newSchedule  = {
            totalTesters: totalInputBoxes,
            totalDuration:[]
        }
        for (let i =0; i<totalInputBoxes; i++){
            newSchedule.totalDuration[i]= $(`input#start-time-${i}`).val() + "-" + $(`input#end-time-${i}`).val()

        }

        let res = postSchedule(newSchedule);
    }


    displaySchedule();
})