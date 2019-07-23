
// Getting the employees data and putting it in an array.  
let listOfEmployees = [];
$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    success: function(data){
        console.log(data);
        listOfEmployees = data.results;
        employeeCards(listOfEmployees);
        }
});


// looping through the array of employees, and putting it next to one another, making a gallery.
// and then adding it to the page.
function employeeCards(employee){
    for (let i=0; i<employee.length; i++){
    let div = `<div class="card" index="${i}">
        <div class="card-img-container">
            <img class="card-img" src=${employee[i].picture.large} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name${i}" class="card-name cap">${employee[i].name.first} ${employee[i].name.last}</h3>
            <p class="card-text">${employee[i].email}</p>
            <p class="card-text cap">${employee[i].location.city}, ${employee[i].location.state}</p>
        </div>
        </div>`;
        $("#gallery").append(div);  
    }


    // Selecting the whole card, not just a certain section of the card.  
    function recursiveSearch(element){
        if(element.hasClass("card")){
            return element;
        }else{
            return recursiveSearch(element.parent());
        }
    }
    

    // When clicking the card, the modal for that card pops up.  
    $(".card").on("click", function (event){
        $(".modal-container").show();
        let clicked = recursiveSearch($(event.target)).attr("index");
        console.log(clicked);
        let selectedEmployee = listOfEmployees[clicked];
        modal(selectedEmployee, Number(clicked));
    });
}


// Creating the modal.
function modal(employee, index){
    let options = {date:"short"}; //formatting the date.
    $(".modal-container").remove(); //removing the modal that was already there, so new modal can show.

    //HTML for modal.
    
    let modalHTML = `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.phone}</p>
            <p class="modal-text cap">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${(new Date(employee.dob.date)).toLocaleDateString("en-US", options)}</p>
        </div>
    </div>

    // IMPORTANT: Below is only for exceeds tasks 
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    </div>`;
    $("body").append(modalHTML); //appending the modal to the body.

    //When the "X" is clicked, the modal is removed.
    $("#modal-close-btn").on("click", function (event){
        $(".modal-container").remove();
    });

    // When "PREV" button is clicked, the modal shows the previous employee. 
    $("#modal-prev").on("click", function (event){

        let prevIndex = index==0 ? listOfEmployees.length-1 : index-1;

        console.log(index);
        let selectedEmployee = listOfEmployees[prevIndex];
        modal(selectedEmployee, prevIndex);
    });

    // When "NEXT" button is clicked, the modal shows the previous employee. 
    $("#modal-next").on("click", function (event){
        let nextIndex = index==listOfEmployees.length-1 ? 0 : index+1;

        console.log(index);
        let selectedEmployee = listOfEmployees[nextIndex];
        modal(selectedEmployee, nextIndex);
    });
}

// Creating the search box and appending it.

const search = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

$(".search-container").append(search);

// On clicking the search button, the employee's name that matches shows up only.
// If the search box is empty when clicking the search button, then all the employees show up again.
$("#search-submit").on("click", function(){
    $(".card").hide();
    let wordSearched = $(".search-input").val().toLowerCase();
    let searchedResults = listOfEmployees.filter(employee => employee.name.first.includes(wordSearched) || employee.name.last.includes(wordSearched));
    console.log(searchedResults);
    if(wordSearched == ""){
        employeeCards(listOfEmployees);
    } else {
        employeeCards(searchedResults);
    } 
})
