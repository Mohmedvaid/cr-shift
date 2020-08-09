$(document).ready(function () {

    //API CALLS 

    let getAvailableTesters = function (availibility) {
        return $.ajax({
            url: "/api/testers/" + availibility,
            method: "GET"
        })
    }

    let getTimes = function (numOfTesters) {
        return $.ajax({
            url: "/api/schedule/" + numOfTesters,
            method: "GET"
        })
    }

    let updateTester = function (testerId) {
        return $.ajax({
            url: "/api/tester/update/" + testerId,
            method: "PUT"
        })
    }

    let updateAllTester = function () {
        return $.ajax({
            url: "/api/updateall",
            method: "PUT"
        })
    }

    let getGIF = function (gifName) {
        return $.ajax({
            url: "/api/gif/" + gifName,
            method: "GET"
        })
    }

    //DISPLAY TESTERS AND TIME!
    async function render(availableTesters, availableTime) {

        for (i = 0; i < availableTesters.length; i++) {
            let currentClass;
            let totalTimeOfTester = availableTime.totalDuration[i].split("-")
            let fromTime = totalTimeOfTester[0].toUpperCase();
            let toTime = totalTimeOfTester[1].toUpperCase();
            let bool = await isShiftNow(fromTime, toTime);
            if (bool) {
                currentClass = `light-red-bg`
            } else {
                currentClass = `normal`
            }

            const block = ` <div class="Tester-container ${currentClass}">
            <div class="tester-name" id="${availableTesters[i]._id}">${availableTesters[i].name}</div>
            <div class="tester-time">${availableTime.totalDuration[i]}</div>
            <button id="${availableTesters[i]._id}" type="button" class="remove-tester-btn remove-btn btn btn-danger">Unavailable</button>
            </div>
            `
            $(`.schedule-container`).append(block)
        }
        let headings = `<div class="headings"><p>Name</p><p>Time</p></div>`
        $(`.schedule-container`).prepend(headings)
    }

    function isShiftNow(fromTime, toTime) {

        let fromNewTime = converTo24Time(fromTime);
        let toNewTime = converTo24Time(toTime);
        let currentTime = moment()

        let format = 'HH:mm'


        let beforeTime = moment(`${toNewTime}`, format);
        let afterTime = moment(`${fromNewTime}`, format);


        if (currentTime.isBetween(afterTime, beforeTime)) {

            return true

        } else {

            return false;

        }



    }

    function converTo24Time(timeString) {
        let newTime = moment(`${timeString}`, ["h:mm A"]).format("HH:mm");
        return newTime;
    }

    //GET AVAILABLE TESTERS AND TIME THEN RENDER USING 'render' FUNCTION
    async function displayTodaysSchedule() {
        $(`.schedule-container`).empty();
        let availableTesters = await getAvailableTesters(true)
        let availableTime = await getTimes(availableTesters.length)
        if (!availableTime) {
            let gifData = await getGIF(`ohno`)
            let gifURL = gifData.data.images.original.url;
            let message = `Oh no! Looks like availibility of testers does not match available time!`
            let block = showError(gifURL, message);
            $(`.container-main`).append(block);
        } else {
            render(availableTesters, availableTime)
        }
    }

    //DISPLAY ERROR MESSAGE WITH A GIF. FUNCTION TAKES IMAGE URL AND MESSAGE TO BE DISPLAYED
    function showError(img, message) {
        let block = `
        <div class="card error-card" style="width: 18rem;">
        <img src="${img}" class="card-img-top" alt="Error">
        <div class="card-body">
            <p class="card-text">${message}</p>
        </div>
        </div>`
        return block;
    }

    let rederDateTime;
    (rederDateTime = function () {
        $(`.date-time`).text(moment().format('MMMM Do , h:mm:ss a'));
    })();
    setInterval(rederDateTime, 1000);




    //CLICK EVENT LISTNER THAT UPDATED THE AVAILIBILITY OF TESTERS.  
    $(document).on('click', '.remove-tester-btn', async function (e) {
        e.preventDefault();
        // MAKE THE CLICKED TESTER UNAVAILABLE
        let updatedTesters = await updateTester(this.id);
        // EMPTY THE DOM AND RENDER NEW DATA
        $(`.schedule-container`).empty();
        displayTodaysSchedule();
    });

    //CLICK EVENT LISTNER WHICH RESETS ALL TESTERS TO 'available'
    $(`.reset-btn`).click(async function () {
        let updated = await updateAllTester();
        $(`.error-card`).remove();
        displayTodaysSchedule();

    })

    //CALLING INITAL FUNCTION ON PAGE LOAD TO RENDER TODAYS SCHEDULE
    displayTodaysSchedule();


})