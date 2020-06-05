let currentProfileEmail = null;
let currentProfileID = null;
let currentProfileIsAdmin = false;


function fillForm(){
    console.log("FILL THAT DAMN THING")
}


function sendDataToFormsToShowPendingForms(destination, data){
    let xhr = new XMLHttpRequest();
    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
               let forms = JSON.parse(xhr.responseText);
               let pendingFormsPage = document.querySelector("#userPendingFormTable");
                
               forms.forEach(form => {
                    let row = document.createElement("tr");

                    let cell = document.createElement("td");
                    cell.textContent = form.title;
                    row.appendChild(cell);

                    cell = document.createElement("td");
                    cell.textContent = form.isFilledOut;
                    if(form.isFilledOut === false){
                        cell.setAttribute("style","color: red");
                    }else{
                        cell.setAttribute("style","color: green");
                    }
                    row.appendChild(cell);

                    if(form.isFilledOut === false){
                        cell = document.createElement("td");
                        cell.textContent = "Click to fill it";
                        cell.addEventListener("click", fillForm);
                        row.appendChild(cell);
                    }

                    pendingFormsPage.appendChild(row);
               })
               
            }
        }
        xhr.open('POST', destination, true);
        xhr.send(data);
    }
}


function showPendingFormsPage(){
    let pendingFormsPage = document.querySelector("#userPendingFormTable");
    pendingFormsPage.setAttribute("style", "display: unset");

    let data = new FormData();
    data.append("userID", currentProfileID);

    sendDataToFormsToShowPendingForms("Form/GetPendingForms", data);
}


function hidePendingFormsHeader(){
    let header = document.querySelector("#headerBlock");
    let pendingFormsHeader = document.querySelector("#pendingFormsHeader");

    header.removeChild(pendingFormsHeader);
}


function showPendingFormsHeader(){
    let header = document.querySelector("#headerBlock");

    let pendingFormsHeader = document.createElement("a");
    pendingFormsHeader.textContent = "Show Pending Forms"
    pendingFormsHeader.setAttribute("class", "header");
    pendingFormsHeader.setAttribute("style","display: unset");
    pendingFormsHeader.setAttribute("id","pendingFormsHeader");
    pendingFormsHeader.addEventListener("click", showPendingFormsPage);

    header.appendChild(pendingFormsHeader);
}


function showLoginHeader(){
    let loginHeader = document.querySelector("#loginHeader");
    loginHeader.setAttribute("style","display: unset");
}


function showRegisterHeader(){
    let registerHeader = document.querySelector("#registerHeader");
    registerHeader.setAttribute("style", "display: unset");
}


function logout(){
    let header = document.querySelector("#headerBlock");

    let headerToRemove = document.querySelector("#logoutHeader");
    header.removeChild(headerToRemove);

    if(currentProfileIsAdmin){
        hideFormMakingHeader();
    }else{
        hidePendingFormsHeader();
    }

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'User/Logout', true);
    xhr.send();

    showLoginHeader();
    showRegisterHeader();

    currentProfileEmail = null;
    currentProfileID = null;

    alert("You logged out!");
}


function hideLoginHeader(){
    let loginHeader = document.querySelector("#loginHeader");
    loginHeader.setAttribute("style","display: none");
}


function hideRegisterHeader(){
    let registerHeader = document.querySelector("#registerHeader");
    registerHeader.setAttribute("style", "display: none");
}


function showLogout(){
    hideLoginHeader();
    hideRegisterHeader();

    let header = document.querySelector("#headerBlock");

    let logoutHeader = document.createElement("a");
    logoutHeader.textContent = "Logout";
    logoutHeader.setAttribute("class", "header");
    logoutHeader.setAttribute("id", "logoutHeader");
    logoutHeader.addEventListener("click", logout);
    
    header.appendChild(logoutHeader);
}


function sendDataToLogin(destination, data) {           //After we logged in we store the userId, email and store if the user is an admin
    let xhr = new XMLHttpRequest();
    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (JSON.parse(xhr.responseText) !== 0) {
                    let profileEmail = 0;
                    let profileId = 1;
                    let profileIsAdmin = 2;

                    let profileData = JSON.parse(xhr.responseText);
                    
                    currentProfileEmail = profileData[profileEmail];
                    currentProfileID = parseInt(profileData[profileId]);

                    if(profileData[profileIsAdmin] === "False"){
                        currentProfileIsAdmin = false;
                        showPendingFormsHeader();

                    }else{
                        currentProfileIsAdmin = true;

                        showFormMakingHeader();
                    }
                   
                    hideLoginPage();
                    showLogout();
                }else{
                    alert("Wrong password!");
                }
            }
        }
        xhr.open('POST', destination, true);
        xhr.send(data);
    }
}


function login(form) {
    let data = new FormData();
    data.append('email', form.email.value);
    data.append('password', form.password.value);
    
    sendDataToLogin("User/Login", data);
}


function sendDataToRegister(destination, data) {
    let xhr = new XMLHttpRequest();
    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert(JSON.parse(xhr.responseText));
                if (JSON.parse(xhr.responseText) != "Success!") {
                    alert(resultText);
                } else {
                    alert("Welcome friend! Now Login please!");
                    hideRegisterPage();
                    showLoginPage();
                }
            }
        }
        xhr.open('POST', destination, true);
        xhr.send(data);
    }
}


function register(form)
{
    let data = new FormData();
    data.append('username',form.username.value);
    data.append('email', form.email.value);
    data.append('password', form.password.value);
    
    sendDataToRegister("User/Register", data);
}



function hideRegisterPage(){
    //Hide the Register page.
    let formBlock = document.querySelector("#registerForms");
    formBlock.setAttribute("style", "display: none");
}


function hideLoginPage(){
    //Hide the Login page.
    let formBlock = document.querySelector("#loginForms");
    formBlock.setAttribute("style", "display: none");
}



function showLoginPage() {
    //Load in the Login "page"

    hideRegisterPage();     //But first hide the Register page if it's clicked before.
    let formBlock = document.querySelector("#loginForms");
    formBlock.setAttribute("style", "display: unset");
}


function showRegisterPage(){
    //Load in the Register "page"

    hideLoginPage();        //But first hide the Login page if it's clicked before.
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
