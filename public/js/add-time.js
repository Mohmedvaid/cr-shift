$(document).ready(function () {
    let totalInputBoxes;
    let allSchedule;


    $(document).on(`click`, `.dropdown-item`, function (e) {
        e.stopPropagation()
        let totalInputBoxes = $(this).text()
        displayInputBoxOnDOM(totalInputBoxes);


        $(`#submit-testers-btn`).click(function (e) {
            e.stopPropagation();
            let isError = getAllTimeFromDOM(totalInputBoxes);
            if (isError === `field empty`) {

                $(`.error-message`).remove();
                let errBlock = `<p class="error-message animate__animated animate__rubberBand" style="color:red; text-align:center;">All the input fields are required!</p>`
                $(errBlock).insertBefore(".add-form-btns");

            } else if (isError === `invalid time`) {
                $(`.error-message`).remove();
                let errBlock = `<p class="error-message animate__animated animate__rubberBand" style="color:red; text-align:center;">Please make sure all the input fields are in 12 hour format. Example:"01:00 PM"</p>`
                $(errBlock).insertBefore(".add-form-btns");

            } else {

                $(`.alltime-container`).empty();
                displaySchedule();
                $(`#input-boxes`).empty();

            }



        })
    })

    $(document).on(`click`, `.delete-time-btn`, function () {
        API.deleteSchedule(this.id);
        $(`.alltime-container`).empty();
        displaySchedule();

    })

    $(document).on(`click`, `.update-time-btn`, function () {
        const id = this.id
        const clickedTime =
            $(`.update-container`).empty();
        let totalInputBoxes = editTime(id);
        scrollTo(`.update-container`);

        $(document).on(`click`, `.update-current-time-btn`, function () {
            const updatedSchedule = getUpdatedTimeFromDOM(totalInputBoxes);
            if (updatedSchedule === `field empty`) {

                $(`.error-message`).remove();
                let errBlock = `<p class="error-message animate__animated animate__rubberBand" style="color:red; text-align:center;">All the input fields are required!</p>`
                $(errBlock).insertBefore(".update-current-time-btn");

            } else if (updatedSchedule === `invalid time`) {
                $(`.error-message`).remove();
                let errBlock = `<p class="error-message animate__animated animate__rubberBand" style="color:red; text-align:center;">Please make sure all the input fields are in 12 hour format. Example:"01:00 PM"</p>`
                $(errBlock).insertBefore(".update-current-time-btn");

            } else {

                const obj = {
                    totalDuration: updatedSchedule
                }
    
                let response = API.updateSchedule(id, obj);
                $(`.alltime-container`).empty();
                $(`.update-container`).empty();
                displaySchedule();

            }

        });

        $(document).on(`click`, `.cancel-update-time-btn`, function () {
            $(`.update-container`).empty().removeClass(`grey-background`);

        })
    })

    $(document).on(`click`, `#clear-input-boxes`, function () {
        $(`#input-boxes`).empty();
    })

    function scrollTo(element) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(element).offset().top
        }, 1000);
    }


    function getUpdatedTimeFromDOM(totalInputBoxes) {
        let totalDuration = [];

        for (let i = 0; i < totalInputBoxes; i++) {
            let startTime = $(`input#start-time-${i}`).val();
            let endTime = $(`input#end-time-${i}`).val();

            let isStartTimeEmpty = isEmpty(startTime);
            let isEndTimeEmpty = isEmpty(endTime);
            //validate
            if (isStartTimeEmpty || isEndTimeEmpty) {
                return `field empty`;
            } else {
                let isStartTimeValid = validateTime(startTime);
                let isEndTimeValid = validateTime(endTime);

                if (!isStartTimeValid || !isEndTimeValid) {
                    return `invalid time`;

                }
                totalDuration[i] = startTime + "-" + endTime;
            }

        }
        return totalDuration;

    }

    function editTime(id) {

        for (let i = 0; i < allSchedule.length; i++) {
            if (id == allSchedule[i]._id) {
                allSchedule[i].totalDuration.map(function (time, index) {
                    const mainTime = time.split("-");
                    const fromTime = mainTime[0];
                    const toTime = mainTime[1];
                    const block = `    
                    <form class = "update-time-form">
                        <div class="form-row">
                        <div class="col time-update">
                            <input value="${fromTime}" type="text" id="start-time-${index}" class="form-control" placeholder="From">
                        </div>
                        <div class="col time-update">
                            <input value="${toTime}" type="text" id="end-time-${index}" class="form-control" placeholder="To">
                        </div>
                        </div>
                    </form>`
                    $(`.update-container`).append(block)
                })
                let TesterText = (allSchedule[i].totalDuration.length == 1) ? 'Tester' : 'Testers';
                $(`.update-container`).prepend(`<p class="update-time-para">Update Time For ${allSchedule[i].totalTesters} ${TesterText}!</p>`);
                $(`.update-container`).append(`<button type="button" class="update-current-time-btn btn btn-success">Update</button>`)
                $(`.update-container`).append(`<button type="button" class="cancel-update-time-btn btn btn-danger">Cancel</button>`)
                $(`.update-container`).addClass(`grey-background`);

                return allSchedule[i].totalTesters;
            }
        }
    }




    async function displaySchedule() {

        allSchedule = await API.getSchedule();

        for (let i = 0; i < allSchedule.length; i++) {
            let TesterText = (allSchedule[i].totalDuration.length == 1) ? 'Tester' : 'Testers';
            let time = allSchedule[i].totalDuration.map((time, index) => {
                const totalTime = time.split(`-`)
                return `                
               <tr>
               <th scope="row">${index+1}</th>
               <td>${totalTime[0]}</td>
               <td>${totalTime[1]}</td>
               </tr>`
            }).join(' ')

            let block = `
            <p class="testing-schedule"> Schedule for ${allSchedule[i].totalTesters} ${TesterText}</p>
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

    function populateAddNewScheduleDDL() {
        const existingShifts = allSchedule.map((schedule, index) => {
            return schedule.totalTesters
        })
        if (existingShifts.length === 0) {
            $(`.testers-ddl`).append(`<button class="dropdown-item" type="button">1</button>`);
            return;
        }

        for (let i = 1; i < 15; i++) {
            for (let j = 0; j < existingShifts.length; j++) {

                if (i != existingShifts[j]) {
                    check = true;
                } else {
                    check = false;
                    break;
                }
            }
            if (check) {
                const block = `<button class="dropdown-item" type="button">${i}</button>`
                $(`.testers-ddl`).append(block);
                check = false;
            }
        }
    }




    function displayInputBoxOnDOM(totalInputBoxes) {
        $(`#input-boxes`).empty()
        let buttonsBlock = `
        <div class="add-form-btns animate__animated animate__backInLeft">
        <button id="submit-testers-btn" type="button" class=" btn btn-success ">Submit</button>
        <button id="clear-input-boxes" type="button" class=" btn btn-danger ">Cancel</button>
        </div>`
        for (let i = 0; i < totalInputBoxes; i++) {
            const block =
                `<form class="animate__animated animate__backInRight add-form">
            <div class="form-row">
              <div class="col each-input-box">
                <input style="text-align: center;" type="text" id="start-time-${i}" class="form-control add-new-input-box" placeholder="Start Time" >
              </div>
              <div class="col each-input-box ">
                <input style="text-align: center;" type="text" id="end-time-${i}" class="form-control add-new-input-box" placeholder="End Time" >
              </div>
            </div>
          </form>`;

            $(`#input-boxes`).append(block)
        }
        $(`#input-boxes`).prepend(`<p class="add-new-text">Add New Schedule for ${totalInputBoxes} Testers!`)
        $(`#input-boxes`).append(buttonsBlock)
    }

    //FUNCTION GETS TIME FROM DOM AND POST IT TO DB
    //RETURNS FALSE IF ERROR ELSE RETURS TRUE
    function getAllTimeFromDOM(totalInputBoxes) {
        let newSchedule = {
            totalTesters: totalInputBoxes,
            totalDuration: []
        }
        for (let i = 0; i < totalInputBoxes; i++) {
            let startTime = $(`input#start-time-${i}`).val();
            let endTime = $(`input#end-time-${i}`).val()
            let isStartTimeEmpty = isEmpty(startTime);
            let isEndTimeEmpty = isEmpty(endTime);
            //validate
            if (isStartTimeEmpty || isEndTimeEmpty) {
                return `field empty`;
            } else {
                let isStartTimeValid = validateTime(startTime);
                let isEndTimeValid = validateTime(endTime);

                if (!isStartTimeValid || !isEndTimeValid) {
                    return `invalid time`;

                }
                newSchedule.totalDuration[i] = startTime + "-" + endTime;
            }

        }

        let res = API.postSchedule(newSchedule);
        return true;
    }

    function isEmpty(val) {
        if (val === "" || val === null) {
            return true;
        } else {
            return false;
        }
    }

    function validateTime(timeToValidate) {
        var regex = /(((0[1-9])|(1[0-2])):([0-5])(0|5)\s(A|P)M)/i;
        let result = regex.test(timeToValidate)
        if (result) {
            return true
        }
        return false;
    }


    displaySchedule();
})