function hideRegister(){
    //Hide the Register page.
    let formBlock = document.querySelector("#registerForms");
    formBlock.setAttribute("style", "display: none");
}


function hideLogin(){
    //Hide the Login page.
    let formBlock = document.querySelector("#loginForms");
    formBlock.setAttribute("style", "display: none");
}



function showLoginPage() {
    //Load in the Login "page"

    hideRegister();     //But first hide the Register page if it's clicked before.
    let formBlock = document.querySelector("#loginForms");
    formBlock.setAttribute("style", "display: unset");
}


function showRegisterPage(){
    //Load in the Register "page"

    hideLogin();        //But first hide the Login page if it's clicked before.
    let formBlock = document.querySelector("#registerForms");
    formBlock.setAttribute("style", "display: unset");
}


function loadPage() {
    console.log("Welcome on the page!"); //TO DO THIS LATER
}


document.addEventListener("DOMContentLoaded", () => {
    let header = document.querySelector("#headerBlock");

    let headerElement = document.querySelector("#firstHeader");
    headerElement.addEventListener("click", loadPage);

    headerElement = document.createElement("a");
    headerElement.textContent = "Register";
    headerElement.setAttribute("class", "header");
    headerElement.setAttribute("id", "registerHeader");
    headerElement.addEventListener("click", showRegisterPage);

    header.appendChild(headerElement);


    headerElement = document.createElement("a");
    headerElement.textContent = "Login";
    headerElement.setAttribute("class", "header");
    headerElement.setAttribute("id", "loginHeader");
    headerElement.addEventListener("click", showLoginPage);

    header.appendChild(headerElement);
})
