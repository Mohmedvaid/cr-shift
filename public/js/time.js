$(document).ready(function(){
    let totalInputBoxes;

    $(`.dropdown-item`).click(function(e){
        e.stopPropagation()
        let totalInputBoxes = $(this).text()
        displayInputBox(totalInputBoxes);

        $(`#submit-testers-btn`).click(function(e){
            console.log(`submit clicked`)
            e.stopPropagation();
            getAllTime(totalInputBoxes);
        })
    })
            


    function displayInputBoxOnDOM(totalInputBoxes){
        $(`#input-boxes`).empty()
        for (let i = 0; i <totalInputBoxes; i++){
            const block = 
            `<div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">First and last name</span>
                    </div>
                    <input id="Time${i}" type="text" aria-label="Time" class="form-control">
                    <input id="Meridiem${i}" type="text" aria-label="Meridiem" class="form-control">
                </div> `;
        
            $(`#input-boxes`).append(block)
        }
        $(`#input-boxes`).append(`<button id="submit-testers-btn" type="button" class=" btn btn-secondary">Submit</button>`)
    }

    function getAllTimeFromDOM(totalInputBoxes){
        console.log(`clicked`)
        let newSchedule  = []
        for (let i =0; i<totalInputBoxes; i++){
            newSchedule[i]= {
                time: $(`input#Time${i}`).val(),
                meridian: $(`input#Meridiem${i}`).val()
            }
        }
        console.log(`new schedule`)
        console.log(newSchedule);
    }


})