let emailCounter = 0;


function hideDetailsOfTheFormPage(){
    let block = document.querySelector("#showDetailsOfTheFormPage");

    while(block.hasChildNodes()){
        block.removeChild(block.lastChild);
    }

    block.setAttribute("style","display: none");
}


function hideUserAnswers(){
    let usersAnswers = document.querySelector("#usersAnswers");

    while(usersAnswers.hasChildNodes()){
        usersAnswers.removeChild(usersAnswers.lastChild);
    }

    usersAnswers.setAttribute("style", "display: none");
}


function SendDataToAnswer(destination, data){
    let xhr = new XMLHttpRequest();
    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
               let result = JSON.parse(xhr.responseText);

               hideDetailsOfTheFormPage();

               let usersAnswers = document.querySelector("#usersAnswers");
               usersAnswers.setAttribute("style", "display: unset");

                result.forEach(answer => {
                    let answerElement = document.createElement("h3");
                    answerElement.textContent = answer.questionText;
                    answerElement.setAttribute("style", "padding-left: 20px")

                    usersAnswers.appendChild(answerElement);
                    usersAnswers.appendChild(document.createElement("br"));

                    answerElement = document.createElement("a");
                    answerElement.textContent = answer.answerText;
                    answerElement.setAttribute("style", "padding-left: 40px")

                    usersAnswers.appendChild(answerElement);
                    usersAnswers.appendChild(document.createElement("br"));
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


function sendDataToAppendEmails(destination, data){
    let xhr = new XMLHttpRequest();
    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let result = JSON.parse(xhr.responseText);
                hideDetailsOfTheFormPage();
                afterSendingEmails(result);
            }
        }
        xhr.open('POST', destination, true);
        xhr.send(data);
    }
}


function removeAppendEmailsButton(){
    let removeElement = document.querySelector("#appendEmailsButton");

    if(removeElement !== null){
        let form = document.querySelector("#moreEmailForm");

        let breaks = document.querySelector("#break1");
        form.removeChild(breaks);

        breaks = document.querySelector("#break2");
        form.removeChild(breaks);

        form.removeChild(removeElement);
    }
}


function sendToMoreUser(formID){
    removeAppendEmailsButton();
    let showDetailsOfTheFormPage = document.querySelector("#showDetailsOfTheFormPage");
    showDetailsOfTheFormPage.appendChild(document.createElement("br"));

    if(emailCounter === 0){
        let moreEmailForm = document.createElement("form");
        moreEmailForm.setAttribute("id", "moreEmailForm");
        moreEmailForm.setAttribute("style", "display: unset");
        showDetailsOfTheFormPage.appendChild(moreEmailForm);
    }

    let emailText = document.createElement("a");
    emailText.textContent = "Email: ";

    moreEmailForm.appendChild(emailText);
    moreEmailForm.appendChild(document.createElement("br"));

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    let inputID = "moreEmail" + emailCounter;
    input.setAttribute("id", inputID);
    input.setAttribute("name", inputID);

    moreEmailForm.appendChild(input);
    moreEmailForm.appendChild(document.createElement("br"));

    let break1 = document.createElement("br");
    break1.setAttribute("id","break1");
    moreEmailForm.appendChild(break1);

    break1 = document.createElement("br");
    break1.setAttribute("id","break2");
    moreEmailForm.appendChild(break1);

    let confirmButton = document.createElement("input");
    confirmButton.setAttribute("type", "button");
    confirmButton.setAttribute("id", "appendEmailsButton");
    confirmButton.value = "Send form to Email(s)";
    confirmButton.addEventListener("click", () => {
        let data = new FormData();

        data.append("adminID", currentProfileID);
        data.append("formID", formID);
        data.append("counter", emailCounter);

        let okToSend = true;
        for(let i = 0; i < emailCounter; i++){
            inputID = "moreEmail" + i;
            let emailAdress = document.forms["moreEmailForm"][inputID].value;

            if(emailAdress === ""){
                alert("You must write an email adress if you clicked!");
                okToSend = false;

                break;
            }else{
                data.append(inputID, emailAdress);
            }
        }

        if(okToSend){
            emailCounter = 0;
            sendDataToAppendEmails("UsersFormsConnection/AppendEmails", data);
        }
    })

    moreEmailForm.appendChild(confirmButton);

    emailCounter++;
}


function sendDataToUsersFormsConnection(destination, data){
    let formID = data.get("formID");
    let xhr = new XMLHttpRequest();

    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let users = JSON.parse(xhr.responseText);

                let userTable = document.querySelector("#tableForUsersWhoGotTheForm");

                let userTableBody = document.createElement("tbody");

                let row = document.createElement("tr");
                
                let cell = document.createElement("td");
                cell.textContent = "Username";
                cell.setAttribute("class", "headerCell");
                row.appendChild(cell);

                cell = document.createElement("td");
                cell.textContent = "E-mail";
                cell.setAttribute("class", "headerCell");
                row.appendChild(cell);

                cell = document.createElement("td");
                cell.textContent = "Filled the form";
                cell.setAttribute("class", "headerCell");
                row.appendChild(cell);

                cell = document.createElement("td");
                cell.textContent = "";
                cell.setAttribute("class", "emptyCell");
                row.appendChild(cell);

                userTableBody.appendChild(row);

                users.forEach(user => {
                    let row = document.createElement("tr");
                    let cell = document.createElement("td");
                    cell.textContent = user.username;
                    cell.setAttribute("class", "cell2");

                    row.appendChild(cell);
                    
                    cell = document.createElement("td");
                    cell.textContent = user.email;
                    cell.setAttribute("class", "cell2");

                    row.appendChild(cell);

                    cell = document.createElement("td");
                    if(user.isFilledTheForm === true){
                        cell.setAttribute("style","background-color: darkolivegreen");
                        cell.textContent = "YES";
                    }else{
                        cell.setAttribute("style","background-color: firebrick");
                        cell.textContent = "NO";
                    }

                    cell.setAttribute("class", "cell2");

                    row.appendChild(cell);


                    if(user.isFilledTheForm === true){
                        cell = document.createElement("td");
                        cell.textContent = "See answers";
                        cell.setAttribute("class", "cell2");
                        cell.addEventListener("click", () => {
                            getAnswersForQuestionsFromOneUser(user.userID, formID);
                        });
                    }

                    row.appendChild(cell);

                    userTableBody.appendChild(row);

                    userTable.appendChild(userTableBody);
                })

                let showDetailsOfTheFormPage = document.querySelector("#showDetailsOfTheFormPage");
                
                showDetailsOfTheFormPage.appendChild(document.createElement("br"));
                
                let addMoreEmailButton = document.createElement("input");
                addMoreEmailButton.setAttribute("type", "button");
                addMoreEmailButton.setAttribute("value", "Click to send to more user");
                addMoreEmailButton.setAttribute("id", "addToSendToMoreUserButton");
                addMoreEmailButton.addEventListener("click", () => {
                    sendToMoreUser(formID)
                });

                showDetailsOfTheFormPage.appendChild(addMoreEmailButton);
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
    hideSentFormsPage();

    let showDetailsOfTheFormPage = document.querySelector("#showDetailsOfTheFormPage");
    showDetailsOfTheFormPage.setAttribute("style", "display: unset");

    let header = document.createElement("h1");
    header.setAttribute("class", "titleContent");
    header.textContent = element.title;

    showDetailsOfTheFormPage.appendChild(header);

    element.questionList.forEach(question => {
        let questionBlock = document.createElement("div");

        header = document.createElement("h4");
        header.setAttribute("class", "textContent");
        header.textContent = question.title;
        questionBlock.appendChild(header);

        showDetailsOfTheFormPage.appendChild(questionBlock);
        showDetailsOfTheFormPage.appendChild(document.createElement("br"));
    })

    

    header = document.createElement("h4");
    header.setAttribute("class", "tableText");
    header.textContent = "User(s) who got the form:";
    showDetailsOfTheFormPage.appendChild(header);


    let table = document.createElement("table");
    table.setAttribute("id", "tableForUsersWhoGotTheForm");

    showDetailsOfTheFormPage.appendChild(table);
    addUsersWhoGotTheForm(element.formID);
}


function appendShowSentFormsPage(element){
    let tableBody = document.querySelector("#showFormsPageTbody");

    let row = document.createElement("tr");
    
    let cell = document.createElement("td");
    cell.textContent = element.title;
    cell.setAttribute("class", "cell");
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.textContent = element.questionList.length;
    cell.setAttribute("style", "text-align: center");
    cell.setAttribute("class", "cell");
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.textContent = "Show Details";
    cell.setAttribute("class", "cell");
    cell.addEventListener("click", () => {
        showAllUsersAsDetail(element);
    });
    row.appendChild(cell);

    tableBody.appendChild(row);
}


function addFirstHeaderToTable(){
    let showFormsPage = document.querySelector("#showFormsPage");
    
    let tableBody = document.createElement("tbody");
    tableBody.setAttribute("id", "showFormsPageTbody");

    let row = document.createElement("tr");
    
    let cell = document.createElement("td");
    cell.textContent = "Form title";
    cell.setAttribute("class", "headerCell");
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.textContent = "Number of Questions";
    cell.setAttribute("class", "headerCell");
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.textContent = "";
    cell.setAttribute("class", "emptyCell");
    row.appendChild(cell);

    tableBody.appendChild(row);

    showFormsPage.appendChild(tableBody);
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

    while(afterSendingPage.hasChildNodes()){
        afterSendingPage.removeChild(afterSendingPage.lastChild);
    }

    afterSendingPage.setAttribute("style", "display: none");
}


function hideSentFormsPage(){
    clearSentFormsPage();
    let showFormsPage = document.querySelector("#showFormsPage");
    showFormsPage.setAttribute("style", "display: none");
}


function clearSentFormsPage(){
    let showFormsPage = document.querySelector("#showFormsPage");

    while(showFormsPage.hasChildNodes()){
        showFormsPage.removeChild(showFormsPage.lastChild);
    }
}


function showSentFormsPage(){
    clearSentFormsPage();
    hideAfterSendingEmailsPage();
    hideDetailsOfTheFormPage();
    hideCreateFormPage();
    hideUserAnswers();

    let showFormsPage = document.querySelector("#showFormsPage");
    showFormsPage.setAttribute("style", "display: unset");

    let data = new FormData();
    data.append("userID", currentProfileID);
    data.append("isAdmin", currentProfileIsAdmin);

    sendDataToSentForms("Form/SentForms", data);
}


function hideSentFormsPageHeader(){
    let header = document.querySelector("#headerBlock");
    let showFormsPageHeader = document.querySelector("#showFormsPageHeader");
    
    if(header !== null){
        header.removeChild(showFormsPageHeader);
    }   
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
        text.setAttribute("class", "textContent");

        afterSendingPage.appendChild(text);
    }else{
        wrongEmails.forEach(element => {
            let text = document.createElement("a");
            text.textContent = "Failed to send form to " + element;
            text.setAttribute("style", "color: red");
            text.setAttribute("class", "textContent");

            afterSendingPage.appendChild(text);
        })   
    }
}