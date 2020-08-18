$(document).ready(function () {

    const testersContainer = $(`.testers`);

    const animationClassesArray = [`animate__backInDown`, `animate__backInUp`, `animate__backInRight`, `animate__backInLeft`, `animate__bounceInDown`, `animate__bounceInUp`, `animate__bounceInRight`, `animate__bounceInLeft`, `animate__fadeInDownBig`, `animate__fadeInUpBig`, `animate__fadeInRightBig`, `animate__fadeInLeftBig`, `animate__lightSpeedInRight`, `animate__lightSpeedInLeft`, `animate__lightSpeedInUp`, `animate__lightSpeedInDown`, `animate__rotateInDownLeft`, `animate__rotateInDownRight`, `animate__rotateInUpLeft`, `animate__rotateInUpRight`, `animate__jackInTheBox`, `animate__rollIn`, `animate__zoomInDown`, `animate__zoomInUp`, `animate__zoomInRight`, `animate__zoomInLeft`, `animate__slideInDown`, `animate__slideInUp`, `animate__slideInRight`, `animate__slideInLeft`, `animate__flip`, `animate__flipInX`, `animate__flipInY`];

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

    //////Factored
    //GET AND DISPLAY TESTERS
    async function displayTesters() {

        //clear the testercontainer so theres no dublicates
        testersContainer.empty();

        //GET ALL TESTERS FROM DB
        let testers = await API.getTesters();
        const randomAnimationClass = getRandomAnimationClass(animationClassesArray);

        //create cards for tester names
        testers.forEach(tester => {
            const block = `
            <div class="card text-center animate__animated ${randomAnimationClass}" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title tester-name" id ="${tester._id}">${tester.name}</h5>
                    <div class="card-btns">
                    <button id="${tester._id}" type="button" class=" delete-tester-btn btn btn-danger">Delete</button>
                    <button id="${tester._id}" type="button" class="update-name-btn btn btn-success">Update</button>
                    </div>
                </div>
            </div>`;

            testersContainer.append(block)
        });
    }

    //function takes an array of animation classes and returns a random class
    function getRandomAnimationClass(animationClassesArray) {
        //get random number between the length of the animationClassesArray
        const randomNumForAnimationAdd = Math.floor(Math.random() * animationClassesArray.length);
        //use a random class to animation
        return animationClassesArray[randomNumForAnimationAdd];

    }

    //ADD NEW TESTER
    $(`#add-tester-btn`).click(validateAndPostNewTester);

    //function validates and posts the new to tester to db
    function validateAndPostNewTester() {
        let newTester = {
            name: $(`#add-tester-input`).val(),
            available: true
        }
        let isValid = validateInput(newTester.name);
        if (isValid) {
            API.addTesters(newTester);
            $(`#add-tester-input`).val("");
            $(`.error-message`).remove();
            displayTesters();
        } else {
            $(`.error-message`).remove();
            let errBlock = `<p class="error-message animate__animated animate__rubberBand">Please enter a value!</p>`
            $(".add-tester-input-box").append(errBlock);
        }
    }

    //funtion scrolls to the element provided
    function scrollTo(element) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(element).offset().top
        }, 1000);
    }

    //function takes a value and returns false if null or empty string else returns true
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
            const obj = {
                name: newName
            }
            API.updateTester(id, obj);
            displayTesters();
        })
    })


    $(document).on('click', '.delete-tester-btn', function () {
        console.log(this.id)
        API.deleteTester(this.id);
        displayTesters();
    });

    // CLEAR UPDATE TESTERS NAME INPUT FEILDS 
    $(document).on(`click`, `.cancel-update`, function () {
        $(`.update-name`).empty();
    })


    displayTesters();





})