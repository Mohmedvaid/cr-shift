$(document).ready(function () {

    //API CALLS 
    let addTesters = function (newTester) {
        return $.ajax({
            url: "/api/testers",
            data: newTester,
            method: "POST"
        });
    }

    let getTesters =  function() {
        return  $.ajax({
            url: "/api/testers",
            method: "GET"
        })
    }

    let deleteTester = function(id){
        return $.ajax({
            url: "/api/tester/" + id,
            method: "DELETE"
        })
    }

    let updateTester = function(id, newName){
        console.log(`NEW NAME`)
        console.log(newName)
        return $.ajax({
            url: "/api/tester/" + id,
            data: newName,
            method: "PUT"
        });

    }



    //ADD NEW TESTER
    $(`#add-tester-btn`).click(function(){
        console.log(`clicked`);
        let newTester = {
            name: $(`#add-tester-input`).val(),
            available: true
        }
        addTesters(newTester);
        displayTesters();
    })

    $(document).on(`click`, `.update-name-btn`, function(){
        const id = this.id
        const testerName = $(`h2#${id}`).text();
        editName(testerName);
        $(document).on(`click`,`.send-new-name`, function(){
            const newName = $(`#newName`).val();
            console.log("NEW NAME=="+newName)
            const obj = {
                name: newName
            }
            updateTester(id, obj);
            displayTesters();
        })
    })

    function editName(newName){
        const block = `<form>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input id="newName" value="${newName}" class="form-control"  aria-describedby="emailHelp">
        </div>
        <button type="submit" class="send-new-name btn btn-primary">Submit</button>
      </form>`
      $(`.update-name`).append(block);
    }


    //GET AND DISPLAY TESTERS
    async function displayTesters(){
        let testers = await getTesters()
        console.log(testers)
        $(`.testers`).empty()

        testers.forEach(tester => {
            const block = `<h2 id ="${tester._id}"> ${tester.name}</h2>
            <button id="${tester._id}" type="button" class=" delete-tester-btn btn btn-secondary">Delete</button>
            <button id="${tester._id}" type="button" class="update-name-btn btn btn-success">Update</button>`
            $(`.testers`).append(block)
        });
    }


    $(document).on('click', '.delete-tester-btn', function(){
        console.log(this.id)
        deleteTester(this.id);
        displayTesters();
    })


    displayTesters();





})