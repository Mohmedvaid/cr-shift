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
            const block = `<h2> ${tester.name}</h2>`
            $(`.testers`).append(block)
        });
    }
    displayTesters();





})