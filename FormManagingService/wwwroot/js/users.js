let currentProfileEmail = null;
let currentProfileID = null;
let currentProfileIsAdmin = false;


function sendDataToAddAnswers(destination, data){
    let xhr = new XMLHttpRequest();
    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let result = JSON.parse(xhr.responseText);

                clearFillFormPage();

                alert(result);
               
            }
        }
        xhr.open('POST', destination, true);
        xhr.send(data);
    }
}


function sendAnswers(form){
    let data = new FormData();

    data.append("counter", form.counter.value);
    data.append("userID", currentProfileID);
    data.append("formID", form.formID.value);

    for(let count = 0; count < form.counter.value; count++){
        let dataElementName = "answer" + count;
        let questionIDFromform = "question" + count;

        let answer = document.forms["formFillingPage"][dataElementName].value;
        let questionID = document.forms["formFillingPage"][questionIDFromform].value;
        
        let questionIDWithAnswerID = [answer, questionID];
        data.append(dataElementName, questionIDWithAnswerID);
    }
    sendDataToAddAnswers("Answer/AddAnswers", data);
}


function clearFillFormPage(){
    let formFillingPage = document.querySelector("#formFillingPage");

    while(formFillingPage.hasChildNodes()){
        if(formFillingPage.childElementCount === 1){
            break;
        }

        formFillingPage.removeChild(formFillingPage.lastChild)
        formFillingPage.setAttribute("style", "display: none");
    }
}


function fillForm(form){
    clearFillFormPage();

    let pendingFormsPage = document.querySelector("#userPendingFormTable");
    pendingFormsPage.setAttribute("style","display: none");

    let formFillingPage = document.querySelector("#formFillingPage");
    formFillingPage.setAttribute("style", "display: unset");

    let counter = 0;
    form.questionList.forEach(question =>{
        formFillingPage.appendChild(document.createElement("br"));

        let questionText = document.createElement("a");
        questionText.textContent = question.title;

        formFillingPage.appendChild(questionText);
        formFillingPage.appendChild(document.createElement("br"));

        let input = document.createElement("input");
        input.setAttribute("type", "text");
        let inputID = "answer" + counter;
        input.setAttribute("id", inputID);
        input.setAttribute("name", inputID)

        formFillingPage.appendChild(input);
        formFillingPage.appendChild(document.createElement("br"));

        //save questionIDs too
        let questionIDToSave = document.createElement("input");
        questionIDToSave.setAttribute("type","text");
        questionIDToSave.setAttribute("style", "display: none");
        let questionID = "question" + counter;
        questionIDToSave.setAttribute("id", questionID);
        questionIDToSave.setAttribute("name", questionID);
        questionIDToSave.setAttribute("value", question.questionID);

        formFillingPage.appendChild(questionIDToSave);

        counter++;
    })

    let counterToSave = document.createElement("input");
    counterToSave.setAttribute("type","text");
    counterToSave.setAttribute("style", "display: none");
    counterToSave.setAttribute("id", "counter");
    counterToSave.setAttribute("name", "counter");
    counterToSave.setAttribute("value", counter);

    formFillingPage.appendChild(counterToSave);

    let formID = document.createElement("input");
    formID.setAttribute("type","text");
    formID.setAttribute("style", "display: none");
    formID.setAttribute("id", "formID");
    formID.setAttribute("name", "formID");
    formID.setAttribute("value", form.formID);

    formFillingPage.appendChild(formID);
}


function sendDataToFormsToShowPendingForms(destination, data){
    let xhr = new XMLHttpRequest();
    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
               let forms = JSON.parse(xhr.responseText);

               clearFillFormPage();

               let pendingFormsPage = document.querySelector("#userPendingFormTable");
               let pendingFormTableBody = document.createElement("tbody");

                let row = document.createElement("tr");

                let cell = document.createElement("td");
                cell.setAttribute("class","headerCell");
                cell.textContent = "Form's Title";
                row.appendChild(cell);

                cell = document.createElement("td");
                cell.setAttribute("class","headerCell");
                cell.setAttribute("style", "text-align: center");
                cell.textContent = "Form is filled";
                row.appendChild(cell);

                cell = document.createElement("td");
                cell.setAttribute("class","emptyCell");
                cell.textContent = "";
                row.appendChild(cell);

                pendingFormTableBody.appendChild(row);

               forms.forEach(form => {
                    row = document.createElement("tr");

                    cell = document.createElement("td");
                    cell.setAttribute("class","cell");
                    cell.textContent = form.title;
                    row.appendChild(cell);

                    cell = document.createElement("td");
                    cell.setAttribute("class","cell");
                    if(form.isFilledOut === false){
                        cell.setAttribute("style","background-color: red; text-align: center");
                        cell.textContent = "NO";
                    }else{
                        cell.setAttribute("style","background-color: green; text-align: center");
                        cell.textContent = "YES";
                    }
                    row.appendChild(cell);

                    if(form.isFilledOut === false){
                        cell = document.createElement("td");
                        cell.setAttribute("class","cell");
                        cell.textContent = "Click to fill it";
                        cell.addEventListener("click", () => {
                            fillForm(form);
                        });
                        row.appendChild(cell);
                    }else{
                        cell = document.createElement("td");
                        cell.setAttribute("class","emptyCell");
                        cell.textContent = "";
                        row.appendChild(cell);
                    }

                    pendingFormTableBody.appendChild(row);
               })
               pendingFormsPage.appendChild(pendingFormTableBody)
            }
        }
        xhr.open('POST', destination, true);
        xhr.send(data);
    }
}


function clearPendingFormsPage(){
    let pendingFormsPage = document.querySelector("#userPendingFormTable");
    
    if(pendingFormsPage !== null){
        while(pendingFormsPage.hasChildNodes()){
            pendingFormsPage.removeChild(pendingFormsPage.lastChild);
        }
    }

    pendingFormsPage.setAttribute("style", "display: none");
}


function showPendingFormsPage(){
    clearPendingFormsPage();

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
        hideFormMakingPage();
        hideAfterSendingEmailsPage();
        hideSentFormsPageHeader();
        hideSentFormsPage();
        hideUserAnswers();
    }else{
        hidePendingFormsHeader();
        clearPendingFormsPage();
        clearFillFormPage();
    }

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'User/Logout', true);
    xhr.send();

    showLoginHeader();
    showRegisterHeader();

    currentProfileEmail = null;
    currentProfileID = null;

    alert("You logged out!");
    showWelcomePage();
}


function hideLoginHeader(){
    let loginHeader = document.querySelector("#loginHeader");
    loginHeader.setAttribute("style","display: none");
}


function hideRegisterHeader(){
    let registerHeader = document.querySelector("#registerHeader");
    registerHeader.setAttribute("style", "display: none");
}


function hideLogoutHeader(){
    let header = document.querySelector("#logoutHeader");
    header.setAttribute("style", "display: none");
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

                        showSentFormsPageHeader();
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
    
    if(form.username.value === "" || form.email.value === "" || form.password.value === ""){
        alert("You must fill all blocks!")
    }else{
        sendDataToRegister("User/Register", data);
    }
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
    hideWelcomePage();
    //Load in the Login "page"

    hideRegisterPage();     //But first hide the Register page if it's clicked before.
    let formBlock = document.querySelector("#loginForms");
    formBlock.setAttribute("style", "display: unset");
}


function showRegisterPage(){
    hideWelcomePage();
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


function showWelcomePage(){
    let welcomePage = document.querySelector("#welcomePage");
    welcomePage.setAttribute("style", "display: unset");
}


function hideWelcomePage(){
    let welcomePage = document.querySelector("#welcomePage");
    welcomePage.setAttribute("style", "display: none");
}