function LoadLoginPage() {
    //ToDo the Login page loading
}


function LoadRegisterPage(){
    //ToDo the loading for register page
}


function LoadPage() {
    //do some naughty things here
}


document.addEventListener("DOMContentLoaded", () => {
    let header = document.querySelector("#headerBlock");

    let headerElement = document.querySelector("firstHeader");
    headerElement.addEventListener("click", LoadPage);

    headerElement = document.createElement("a");
    headerElement.textContent = "Register";
    headerElement.setAttribute("class", "header");
    headerElement.setAttribute("id", "registerHeader");
    headerElement.addEventListener("click", LoadRegisterPage);

    header.appendChild(headerElement);


    headerElement = document.createElement("a");
    headerElement.textContent = "Login";
    headerElement.setAttribute("class", "header");
    headerElement.setAttribute("id", "loginHeader");
    headerElement.addEventListener("click", LoadLoginPage);

    header.appendChild(headerElement);
})
