const search = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>`;

let listOfEmployees = [];
$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    success: function(data){
        console.log(data);
        listOfEmployees = data.results;
        employeeCards();
        }
});

function employeeCards(employee){
    for (let i=0; i<listOfEmployees.length; i++){
    let div = `<div class="card" index="${i}">
        <div class="card-img-container">
            <img class="card-img" src=${listOfEmployees[i].picture.large} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${listOfEmployees[i].name.first} ${listOfEmployees[i].name.last}</h3>
            <p class="card-text">${listOfEmployees[i].email}</p>
            <p class="card-text cap">${listOfEmployees[i].location.city}, ${listOfEmployees[i].location.state}</p>
        </div>
        </div>`;
        $("#gallery").append(div);  
    }

    function recursiveSearch(element){
        if(element.hasClass("card")){
            return element;
        }else{
            return recursiveSearch(element.parent());
        }
    }
    
    $(".card").on("click", function (event){
        //modal();
        $(".modal-container").show();
        let clicked = recursiveSearch($(event.target)).attr("index");
        console.log(clicked);
        let selectedEmployee = listOfEmployees[clicked];
        modal(selectedEmployee);
    });
        
}


function modal(employee){
let options = {year: 'numeric', month:"long", day:"numeric"};

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
        <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
        <p class="modal-text">Birthday: ${(new Date(employee.dob.date)).toLocaleDateString("en-US", options)}</p>
    </div>
</div>

// IMPORTANT: Below is only for exceeds tasks 
<div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
</div>
</div>`;
$("body").append(modalHTML);

$("#modal-close-btn").on("click", function (event){
    $(".modal-container").remove();



})

}



// $(".card").on("click", function (event){
// //modal();
// $(".modal-container").show();
// let click = recursiveSearch($(event.target)).attr("index");
// let selectedEmployee = listOfEmployees[click];
// modal(selectedEmployee);
// });


// function recursiveSearch(element){
//     if(element.hasClass("card")){
//         return element;
//     }else{
//         return recursiveSearch(element.parent());
//     }
// }

// $(".card").on("click", function (event){
//     //modal();
//     $(".modal-container").show();
//     let click = recursiveSearch($(event.target)).attr("index");
//     console.log(click);
//     let selectedEmployee = listOfEmployees[click];
//     modal(selectedEmployee);
// });
    

$(".search-container").append(search);
// $("body").append(modal);