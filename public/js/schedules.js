$(document).ready(function () {

    //================  INITIAL DATA ==================//
    let totalInputBoxes;
    let allSchedule;
    const SchedulesContainer = $(`.update-container`);
    const emptyFieldErrorMessage = `<p class="error-message animate__animated animate__rubberBand" style="color:red; text-align:center;">All the input fields are required!</p>`
    const invalidTimeFormatMessage = `<p class="error-message animate__animated animate__rubberBand" style="color:red; text-align:center;">Please make sure all the input fields are in 12 hour format. Example:"01:00 PM"</p>`

    //================  FUNCTIONS ==================//
    function postNewSchedule(e) {
        let totalInputBoxes = $(this).text()
        displayInputFields(totalInputBoxes);

        //validate and post new schedule to db
        $(`#submit-testers-btn`).click( async function (e) {
            let data = getNewScheduleFromDOM(totalInputBoxes);
            if (data === `field empty`) {
                $(`.error-message`).remove();
                $(emptyFieldErrorMessage).insertBefore(".add-form-btns");
            } else if (data === `invalid time`) {
                $(`.error-message`).remove();
                $(invalidTimeFormatMessage).insertBefore(".add-form-btns");
            } else {
                let res = await API.postSchedule(data);
                $(`.alltime-container`).empty();
                displaySchedule();
                $(`#input-boxes`).empty();
            }
        })
    }

    //delete tester and display new list
    async function deleteAndDisplaySchedule () {
        API.deleteSchedule(this.id);
        $(`.alltime-container`).empty();
        displaySchedule();
    }


    async function postUpdatedSchedule() {
        const id = this.id
        SchedulesContainer.empty();
        let totalInputBoxes = renderInputFields(id);
        scrollTo(`.update-container`);

        $(document).on(`click`, `.update-current-time-btn`, function () {
            const updatedSchedule = getUpdatedScheduleFromDOM(totalInputBoxes);
            if (updatedSchedule === `field empty`) {
                $(`.error-message`).remove();
                $(emptyFieldErrorMessage).insertBefore(".update-current-time-btn");
            } else if (updatedSchedule === `invalid time`) {
                $(`.error-message`).remove();
                $(invalidTimeFormatMessage).insertBefore(".update-current-time-btn");
            } else {
                const UpdatedSchedule = {
                    totalDuration: updatedSchedule
                }
                let response = API.updateSchedule(id, UpdatedSchedule);
                $(`.alltime-container`).empty();
                SchedulesContainer.empty();
                SchedulesContainer.empty().removeClass(`grey-background`);
                displaySchedule();
            }
        });
        $(document).on(`click`, `.cancel-update-time-btn`, function () {
            SchedulesContainer.empty().removeClass(`grey-background`);
        })
    }

    $(document).on(`click`, `#clear-input-boxes`, function () {
        $(`#input-boxes`).empty();
    })

    function scrollTo(element) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(element).offset().top
        }, 1000);
    }


    function getUpdatedScheduleFromDOM(totalInputBoxes) {
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

    function renderInputFields(id) {

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
                    SchedulesContainer.append(block)
                })
                let TesterText = (allSchedule[i].totalDuration.length == 1) ? 'Tester' : 'Testers';
                SchedulesContainer.prepend(`<p class="update-time-para">Update Time For ${allSchedule[i].totalTesters} ${TesterText}!</p>`);
                SchedulesContainer.append(`<button type="button" class="update-current-time-btn btn btn-success">Update</button>`)
                SchedulesContainer.append(`<button type="button" class="cancel-update-time-btn btn btn-danger">Cancel</button>`)
                SchedulesContainer.addClass(`grey-background`);

                return allSchedule[i].totalTesters;
            }
        }
    }


    async function displaySchedule() {
        //get all schedule from db
        allSchedule = await API.getSchedule();
        //render all schedules on DOM
        let renderComplete = await render.schedule(allSchedule);
        //clear the values in the "Add New Schedule" DDL
        $(`.testers-ddl`).empty();
        //populate with new values in the DDL
        populateDropdownValues();
    }

    //function add value to "Add New DDL" 
    function populateDropdownValues() {
        const existingShifts = allSchedule.map((schedule, index) => {
            return schedule.totalTesters
        })
        //if no there are no schedule then add "1" to the ddl
        if (existingShifts.length === 0) {
            $(`.testers-ddl`).append(`<button class="dropdown-item" type="button">1</button>`);
            return;
        }
        //ONLY 15 SCHEDULES CAN BE ADDED TO DB
        //populate values for non-existing schedules only so there are no dublicates
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




    function displayInputFields(totalInputBoxes) {
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

    //function gets time from dom and post it to db
    //returns false if error else returs true
    function getNewScheduleFromDOM(totalInputBoxes) {
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
        return newSchedule;
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

    $(document).on(`click`, `.dropdown-item`,postNewSchedule);
    $(document).on(`click`, `.update-time-btn`,postUpdatedSchedule);
    $(document).on(`click`, `.delete-time-btn`,deleteAndDisplaySchedule );

    displaySchedule();
})