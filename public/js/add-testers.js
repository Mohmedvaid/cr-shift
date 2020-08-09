$(document).ready(function () {

    //API CALLS 
    let addTesters = function (newTester) {
        return $.ajax({
            url: "/api/testers",
            data: newTester,
            method: "POST"
        });
    }

    let getTesters = function () {
        return $.ajax({
            url: "/api/testers",
            method: "GET"
        })
    }

    let deleteTester = function (id) {
        return $.ajax({
            url: "/api/tester/" + id,
            method: "DELETE"
        })
    }

    let updateTester = function (id, newName) {
        console.log(`NEW NAME`)
        console.log(newName)
        return $.ajax({
            url: "/api/tester/" + id,
            data: newName,
            method: "PUT"
        });

    }

    //================ LOGIC FUNCTIONS ==================//

    //DISPLAY INPUT BOXES TO UPDATE THE TESTERS NAME
    function displyUpdateNameInputBoxes(newName) {
        const block = `<form class="update-name-form">
        <div class="form-group">
          <label for="exampleInputEmail1">Update ${newName}</label>
          <input id="newName" value="${newName}" class="form-control"  aria-describedby="emailHelp">
        </div>
        <button type="submit" class="send-new-name btn ">Update</button>
        <button type="submit" class="cancel-update btn ">Cancel</button>
      </form>`
        $(`.update-name`).append(block);
    }

    // CLEAR UPDATE TESTERS NAME INPUT FEILDS 
    $(document).on(`click`, `.cancel-update`, function () {
        $(`.update-name`).empty();
    })


    //GET AND DISPLAY TESTERS
    async function displayTesters() {
        //GET ALL TESTERS FROM DB
        let testers = await getTesters()
        $(`.testers`).empty()

        const animationArr = [`animate__backInDown`, `animate__backInUp`, `animate__backInRight`, `animate__backInLeft`, `animate__bounceInDown`, `animate__bounceInUp`, `animate__bounceInRight`, `animate__bounceInLeft`, `animate__fadeInDownBig`, `animate__fadeInUpBig`, `animate__fadeInRightBig`, `animate__fadeInLeftBig`, `animate__lightSpeedInRight`, `animate__lightSpeedInLeft`, `animate__lightSpeedInUp`, `animate__lightSpeedInDown`, `animate__rotateInDownLeft`, `animate__rotateInDownRight`, `animate__rotateInUpLeft`, `animate__rotateInUpRight`, `animate__jackInTheBox`, `animate__rollIn`, `animate__zoomInDown`, `animate__zoomInUp`, `animate__zoomInRight`, `animate__zoomInLeft`, `animate__slideInDown`, `animate__slideInUp`, `animate__slideInRight`, `animate__slideInLeft`, `animate__flip`, `animate__flipInX`, `animate__flipInY`];
        const randomNumForAnimationAdd = Math.floor(Math.random() * 32);
        const randomClass = animationArr[randomNumForAnimationAdd];

        testers.forEach(tester => {
            const block = `
            <div class="card text-center animate__animated ${randomClass}" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title tester-name" id ="${tester._id}">${tester.name}</h5>
            <div class="card-btns">
            <button id="${tester._id}" type="button" class=" delete-tester-btn btn btn-danger">Delete</button>
            <button id="${tester._id}" type="button" class="update-name-btn btn btn-success">Update</button>
            </div>
        </div>
        </div>`
            $(`.testers`).append(block)
        });
    }

    //ADD NEW TESTER
    $(`#add-tester-btn`).click(function () {
        let newTester = {
            name: $(`#add-tester-input`).val(),
            available: true
        }
        let isValid = validateInput(newTester.name);
        if (isValid) {
            addTesters(newTester);
            $(`#add-tester-input`).val("")
            displayTesters();
        } else {
            $(`.error-message`).remove();
            let errBlock = `<p class="error-message animate__animated animate__rubberBand">Please enter a value!</p>`
            $(".add-tester-input-box").append(errBlock);


        }
    })

    function scrollTo(element) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(element).offset().top
        }, 1000);
    }

    function validateInput(val) {
        if (val === "" || val === null) {
            return false;
        } else {
            return true;
        }
    }

    $(document).on(`click`, `.update-name-btn`, function () {
        $(`.update-name`).empty();
        const id = this.id
        const testerName = $(`h5#${id}`).text();
        displyUpdateNameInputBoxes(testerName);
        scrollTo(`.update-name`)
        $(document).on(`click`, `.send-new-name`, function () {
            const newName = $(`#newName`).val();
            console.log("NEW NAME==" + newName)
            const obj = {
                name: newName
            }
            updateTester(id, obj);
            displayTesters();
        })
    })


    $(document).on('click', '.delete-tester-btn', function () {
        console.log(this.id)
        deleteTester(this.id);
        displayTesters();
    })


    displayTesters();





})