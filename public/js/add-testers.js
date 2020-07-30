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

    //GET AND DISPLAY TESTERS
    async function displayTesters(){
        let testers = await getTesters()
        console.log(testers)
        $(`.testers`).empty()

        testers.forEach(tester => {
            const block = `<h2 id ="${tester._id}"> ${tester.name}</h2>
            <button id="${tester._id}" type="button" class=" delete-tester-btn btn btn-secondary">Delete</button>`
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