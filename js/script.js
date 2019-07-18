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
        modal(selectedEmployee, Number(clicked));
    });
}



function modal(employee, index){
    let options = {date:"short"};
    $(".modal-container").remove();

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
    $("body").append(modalHTML);

    $("#modal-close-btn").on("click", function (event){
        $(".modal-container").remove();
    });

    $("#modal-prev").on("click", function (event){
        let prevIndex = index==0 ? listOfEmployees.length-1 : index-1;

        console.log(index);
        let selectedEmployee = listOfEmployees[prevIndex];
        modal(selectedEmployee, prevIndex);
    });

    $("#modal-next").on("click", function (event){

        let nextIndex;
        if (index==listOfEmployees.length-1){nextIndex = 0}else{nextIndex = index+1}
        //let nextIndex = index==listOfEmployees.length-1 ? 0 : index+1;

        console.log(index);
        let selectedEmployee = listOfEmployees[nextIndex];
        modal(selectedEmployee, nextIndex);
    });
}


$(".search-container").append(search);

// function myFunction() {
//   // Declare variables
//   ul = document.getElementById("myUL");
//   li = ul.getElementsByTagName('li');

//   let searchWord = $("#search-input").val().toLowerCase();
//   let cardsNumber = $(".card").length;

//   // Loop through all list items, and hide those who don't match the search query
//   for (let i = 0; i < cardsNumber; i++) {
//       $(".card")[i]
//     a = li[i].getElementsByTagName("a")[0];
//     txtValue = a.textContent || a.innerText;
//     if (listOfEmployees[i].name.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }
console.log(listOfEmployees);


