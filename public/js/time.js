$(document).ready(function(){

    console.log(`yaya`)
    $(`.dropdown-item`).click(function(e){
        let totalInputBoxes = $(this).text()
        displayInputBox(totalInputBoxes);
    })

    function displayInputBox(totalInputBoxes){
        $(`#input-boxes`).empty()
        for (let i = 0; i <totalInputBoxes; i++){
            const block = 
            `<div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">First and last name</span>
                    </div>
                    <input type="text" aria-label="First name" class="form-control">
                    <input type="text" aria-label="Last name" class="form-control">
                </div> `;
        
            $(`#input-boxes`).append(block)
        }
    }


})