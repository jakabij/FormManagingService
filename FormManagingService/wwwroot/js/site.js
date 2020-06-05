function SendDataToAnswer(destination, data){
    let xhr = new XMLHttpRequest();
    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
               let result = JSON.parse(xhr.responseText);

               let block = document.querySelector("#showDetailsOfTheFormPage");
               block.setAttribute("style","display: none");

               let usersAnswers = document.querySelector("#usersAnswers");
               usersAnswers.setAttribute("style", "display: unset");

                result.forEach(answer => {
                    let answerElement = document.createElement("h3");
                    answerElement.textContent = answer.questionText;

                    usersAnswers.appendChild(answerElement);
                    usersAnswers.appendChild(document.createElement("br"));

                    answerElement = document.createElement("a");
                    answerElement.textContent = answer.answerText;

                    usersAnswers.appendChild(answerElement);
                    usersAnswers.appendChild(document.createElement("br"));
                })
            }
        }
        xhr.open('POST', destination, true);
        xhr.send(data);
    }
}


function getAnswersForQuestionsFromOneUser(userID, formID){
    let data = new FormData();
    data.append("userID", userID);
    data.append("formID", formID);

    SendDataToAnswer("Answer/getAnswersForQuestionsFromOneUser", data);
}


function sendDataToUsersFormsConnection(destination, data){
    let formID = data.get("formID");
    let xhr = new XMLHttpRequest();

    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
               let users = JSON.parse(xhr.responseText);

               let userTable = document.querySelector("#tableForUsersWhoGotTheForm");

                users.forEach(user => {
                    let row = document.createElement("tr");
                    let cell = document.createElement("td");
                    cell.textContent = user.username;
                    cell.setAttribute("class", "cell");

                    row.appendChild(cell);
                    
                    cell = document.createElement("td");
                    cell.textContent = user.email;
                    cell.setAttribute("class", "cell");

                    row.appendChild(cell);

                    cell = document.createElement("td");
                    cell.textContent = user.isFilledTheForm;
                    if(user.isFilledTheForm === true){
                        cell.setAttribute("style","color: darkolivegreen");
                        cell.addEventListener("click", () => {
                            getAnswersForQuestionsFromOneUser(user.userID, formID);
                        });
                    }else{
                        cell.setAttribute("style","color: firebrick");
                    }

                    cell.setAttribute("class", "cell");

                    row.appendChild(cell);

                    userTable.appendChild(row);
                })
               
            }
        }
        xhr.open('POST', destination, true);
        xhr.send(data);
    }
}


function addUsersWhoGotTheForm(formID){
    let data = new FormData();
    data.append("formID", formID);

    sendDataToUsersFormsConnection("UsersFormsConnection/GetUsers", data);
}


function showAllUsersAsDetail(element){
    let showDetailsOfTheFormPage = document.querySelector("#showDetailsOfTheFormPage");

    let header = document.createElement("h1");
    header.textContent = element.title;

    showDetailsOfTheFormPage.appendChild(header);

    element.questionList.forEach(question => {
        let questionBlock = document.createElement("div");

        header = document.createElement("h4");
        header.textContent = question.title;
        questionBlock.appendChild(header);

        showDetailsOfTheFormPage.appendChild(questionBlock);
        showDetailsOfTheFormPage.appendChild(document.createElement("br"));
    })

    let table = document.createElement("table");
    table.setAttribute("id", "tableForUsersWhoGotTheForm");

    showDetailsOfTheFormPage.appendChild(table);
    addUsersWhoGotTheForm(element.formID);
}


function appendShowSentFormsPage(element){
    let showFormsPage = document.querySelector("#showFormsPage");
    
    let row = document.createElement("tr");
    
    let cell = document.createElement("td");
    cell.textContent = element.title;
    cell.setAttribute("class", "cell");
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.textContent = element.questionList.length;
    cell.setAttribute("class", "cell");
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.textContent = "Show Details";
    cell.setAttribute("class", "cell");
    cell.addEventListener("click", () => {
        showAllUsersAsDetail(element);
    });
    row.appendChild(cell);

    showFormsPage.appendChild(row);
}


function addFirstHeaderToTable(){
    let showFormsPage = document.querySelector("#showFormsPage");
    let row = document.createElement("tr");
    
    let cell = document.createElement("td");
    cell.textContent = "Form title";
    cell.setAttribute("class", "cell");
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.textContent = "Number of Questions";
    cell.setAttribute("class", "cell");
    row.appendChild(cell);

    showFormsPage.appendChild(row);
}


function sendDataToSentForms(destination, data){
    let xhr = new XMLHttpRequest();
    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                addFirstHeaderToTable();
            
                let result = JSON.parse(xhr.responseText);

                result.forEach(element => {
                    appendShowSentFormsPage(element);
                })
            }
        }
        xhr.open('POST', destination, true);
        xhr.send(data);
    }
}


function hideAfterSendingEmailsPage(){
    let afterSendingPage = document.querySelector("#afterSendingForms");
    while(afterSendingPage.firstChild){
        afterSendingPage.removeChild(afterSendingPage.lastChild);
    }

    afterSendingPage.setAttribute("style", "display: none");
}


function hideSentFormsPage(){
    let showFormsPage = document.querySelector("#showFormsPage");
    showFormsPage.setAttribute("style", "display: none");
}


function showSentFormsPage(){
    hideAfterSendingEmailsPage();

    let showFormsPage = document.querySelector("#showFormsPage");
    showFormsPage.setAttribute("style", "display: unset");

    let data = new FormData();
    data.append("adminID", currentProfileID);

    sendDataToSentForms("Form/SentForms", data);
}


function hideSentFormsPageHeader(){
    let header = document.querySelector("#headerBlock");
    let showFormsPageHeader = document.querySelector("#showFormsPageHeader");
    
    header.removeChild(showFormsPageHeader);
}


function showSentFormsPageHeader(){
    let header = document.querySelector("#headerBlock");

    let showFormsPageHeader = document.createElement("a");
    showFormsPageHeader.textContent = "Show Sent Forms";
    showFormsPageHeader.setAttribute("class", "header");
    showFormsPageHeader.setAttribute("id", "showFormsPageHeader");
    showFormsPageHeader.addEventListener("click", showSentFormsPage);

    header.appendChild(showFormsPageHeader);
}


function afterSendingEmails(wrongEmails){
    let afterSendingPage = document.querySelector("#afterSendingForms");
    afterSendingPage.setAttribute("style", "display: unset");

    if(wrongEmails.length === 0){
        let text = document.createElement("a");
        text.setAttribute("style", "color: green");
        text.textContent = "Successfully sent all of the forms to the emails.";

        afterSendingPage.appendChild(text);
    }else{
        wrongEmails.forEach(element => {
            let text = document.createElement("a");
            text.textContent = "Failed to send form to " + element;
            text.setAttribute("style", "color: red");

            afterSendingPage.appendChild(text);
            afterSendingPage.appendChild(document.createElement("br"));
        })   
    }

    showSentFormsPageHeader();
}