const render = {
    //function takes all schedules object and renders on DOM
    schedule : function(allSchedule){
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

    }
};