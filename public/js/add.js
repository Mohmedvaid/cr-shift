$(document).ready(function () {

    let addTesters = function (newTester) {
        return $.ajax({
            url: "/api/testers",
            data: newTester,
            method: "POST"
        });
    }

    
    $(`#add-tester-btn`).click(function(){
        console.log(`clicked`);
        let newTester = {
            name: $(`#add-tester-input`).val(),
            available: true
        }

        console.log(newTester)
        addTesters(newTester)
    })



})