let emailCounter = 0;


function hideDetailsOfTheFormPage(){
    let block = document.querySelector("#showDetailsOfTheFormPage");

    while(block.hasChildNodes()){
        block.removeChild(block.lastChild);
    }

    block.setAttribute("style","display: none");
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
        for(let i = 0; i < emailCounter; i++){
            inputID = "moreEmail" + i;

            console.log("YEEET: "+ inputID)

            data.append(inputID, document.forms["moreEmailForm"][inputID].value)
        }

        emailCounter = 0;
        sendDataToAppendEmails("UsersFormsConnection/AppendEmails", data);
    })

    moreEmailForm.appendChild(confirmButton);

    emailCounter++;     //ezt megnézni paraméter átadásos növelés során.
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
                    }else{
                        cell.setAttribute("style","color: firebrick");
                    }

                    cell.setAttribute("class", "cell");

                    row.appendChild(cell);


                    if(user.isFilledTheForm === true){
                        cell = document.createElement("td");
                        cell.textContent = "See answers";
                        cell.addEventListener("click", () => {
                            getAnswersForQuestionsFromOneUser(user.userID, formID);
                        });
                    }

                    row.appendChild(cell);

                    userTable.appendChild(row);
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
               



                //add more emails




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
        })   
    }
}