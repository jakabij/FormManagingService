let questionCounter = 0;
let emailAdressCounter = 1;



function hideEmailAddingPage(){
    let emailAddingPage = document.querySelector("#emailAddingForm");

    for(let count = 1; count < emailAddingPage.childElementCount; count++){
        emailAddingPage.removeChild(emailAddingPage.children[count]);
    }

    emailAddingPage.setAttribute("style", "display :none");
}


function sendDataToFormsEmail(destination, data){
    let xhr = new XMLHttpRequest();
    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let result = JSON.parse(xhr.responseText);
                hideEmailAddingPage();
                afterSendingEmails(result);
            }
        }
        xhr.open('POST', destination, true);
        xhr.send(data);
    }
}


function sendToUsers(form){
    let header = document.querySelector("#logoutHeader");
    header.setAttribute("style", "display: unset");
    
    let data = new FormData();
    data.append("adminID", currentProfileID);
    data.append("emailCount", emailAdressCounter);

    let okToSend = true;

    for(let count = 0; count < emailAdressCounter; count++){
        let dataElementName = "email" + (count + 1);

        let emailAdress = document.forms["emailAddingForm"][dataElementName].value;

        if(emailAdress === ""){
            okToSend = false;
            alert("You must add an email adress!");
            break;
        }else{
            data.append(dataElementName, emailAdress);
        }
    }

    if(okToSend){
        showFormMakingHeader();
        showSentFormsPageHeader();
        sendDataToFormsEmail("Form/AddUsersToForm", data);
        emailAdressCounter = 1;
    }
}


function addMoreEmail(){
    emailAdressCounter++;
    let emailAddingPage = document.querySelector("#emailAddingForm");

    emailAddingPage.appendChild(document.createElement("br"));
    emailAddingPage.appendChild(document.createElement("br"));

    let emailText = document.createElement("a");
    emailText.textContent = "Email:"
    emailText.setAttribute("class", "textContent");
    emailAddingPage.appendChild(emailText);

    emailAddingPage.appendChild(document.createElement("br"));

    let anotherEmail = document.createElement("input");
    anotherEmail.setAttribute("type", "text");
    anotherEmail.setAttribute("class", "createFormButton");
    let emailID = "email" + emailAdressCounter;
    anotherEmail.setAttribute("name", emailID);

    emailAddingPage.appendChild(anotherEmail);
}


function showEmailAddingPage(){
    hideSentFormsPageHeader();
    hideFormMakingHeader();
    hideLogoutHeader();

    let emailAddingPage = document.querySelector("#emailAddingForm");
    emailAddingPage.setAttribute("style", "display: unset");

    emailAddingPage.appendChild(document.createElement("br"));

    let addMoreEmailButton = document.createElement("input");
    addMoreEmailButton.setAttribute("type", "button");
    addMoreEmailButton.setAttribute("value", "Click to add more Email");
    addMoreEmailButton.setAttribute("id", "addMoreEmailButton");
    addMoreEmailButton.setAttribute("style","margin-block-start: 20px; margin-inline-start: 75%")
    addMoreEmailButton.addEventListener("click", addMoreEmail);

    emailAddingPage.appendChild(addMoreEmailButton);

    emailAddingPage.appendChild(document.createElement("br"));
    emailAddingPage.appendChild(document.createElement("br"));

    let emailText = document.createElement("a");
    emailText.textContent = "Email:"
    emailText.setAttribute("class", "textContent");
    emailAddingPage.appendChild(emailText);

    emailAddingPage.appendChild(document.createElement("br"));

    let firstEmail = document.createElement("input");
    firstEmail.setAttribute("type", "text");
    firstEmail.setAttribute("name", "email1");
    firstEmail.setAttribute("class", "createFormButton");

    emailAddingPage.appendChild(firstEmail);
}


function hideFormMakingPage(){
    let formMakingPage = document.querySelector("#questionForms");
    
    for(let count = 1; count < (formMakingPage.childElementCount); count++){
        formMakingPage.removeChild(formMakingPage.children[count]);
    }

    formMakingPage.setAttribute("style", "display :none");
}


function sendDataToForms(destination, data){
    let xhr = new XMLHttpRequest();
    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // hideFormMakingHeader();
                hideFormMakingPage();
                showEmailAddingPage();
            }
        }
        xhr.open('POST', destination, true);
        xhr.send(data);
    }
}


function saveForm(form){
    if(questionCounter === 0){
        alert("Add at least one question!");
    }else{
        let data = new FormData();

        data.append("adminID", currentProfileID);
        data.append("questionCount", questionCounter);
        data.append("questionTitle", document.forms["questionForm"]["formTitle"].value);

        let okToSend = true;

        for(let i = 0; i < questionCounter; i++){
            let questionID = "question" + i;
            let question = document.forms["questionForm"][questionID].value;
            if (question === "" || document.forms["questionForm"]["formTitle"].value === ""){
                alert("You must fill the blocks!");
                okToSend = false;
                break;
            }else{
                data.append(questionID, question);
            }
        }

        if(okToSend){
            sendDataToForms("Form/AddForm", data);
            questionCounter = 0;
        }
    }
}


function addQuestion(formStack, counter){   //Generate the questions
    formStack.appendChild(document.createElement("br"));

    let questionText = document.createElement("a");
    questionText.textContent = "What is going to be the question?"
    questionText.setAttribute("class", "textContent");
    formStack.appendChild(questionText);
    formStack.appendChild(document.createElement("br"));

    let question = document.createElement("input");

    let questionId = "question" + counter;
    question.setAttribute("id", questionId);
    question.setAttribute("name", questionId);
    question.setAttribute("class", "createFormButton");

    formStack.appendChild(question);
    formStack.appendChild(document.createElement("br"));
    questionCounter ++;
}


function hideCreateFormPage(){
    let createFormPage = document.querySelector("#questionForms");

    while(createFormPage.hasChildNodes()){
        if(createFormPage.childElementCount === 1){
            break;
        }else{
            createFormPage.removeChild(createFormPage.lastChild);
        }
        
    }

    createFormPage.setAttribute("style","display: none");
}


function createFormPage(){          //in this page you can create forms and save it to the database
    questionCounter = 0;

    clearSentFormsPage();
    hideAfterSendingEmailsPage();
    hideDetailsOfTheFormPage();
    hideSentFormsPage();
    hideUserAnswers();

    let createFormPage = document.querySelector("#questionForms");
    createFormPage.setAttribute("style","display: unset");

    let questionButton = document.createElement("input");
    questionButton.setAttribute("type","button");
    questionButton.setAttribute("class", "registerLoginButton");
    questionButton.setAttribute("id", "addQuestionButton");
    questionButton.setAttribute("value", "Add Question");
    questionButton.addEventListener("click", ()=>{
        addQuestion(createFormPage, questionCounter)
    });

    createFormPage.appendChild(questionButton);

    createFormPage.appendChild(document.createElement("br"));

    let titleText = document.createElement("a");
    titleText.textContent = "The title of the form:"
    titleText.setAttribute("class", "textContent");
    createFormPage.appendChild(titleText);

    createFormPage.appendChild(document.createElement("br"));
    let titleInput = document.createElement("input");
    titleInput.setAttribute("class", "createFormButton");
    titleInput.setAttribute("id", "formTitle");
    titleInput.setAttribute("name", "formTitle");

    createFormPage.appendChild(titleInput);
    createFormPage.appendChild(document.createElement("br"));
    createFormPage.appendChild(document.createElement("br"));
}


function hideFormMakingHeader(){
    let createFormHeader = document.querySelector("#createFormHeader");
    
    createFormHeader.setAttribute("style","display: none");
}


function showFormMakingHeader(){
    let header = document.querySelector("#headerBlock");

    let createFormHeader = document.querySelector("#createFormHeader");

    if(createFormHeader === null){
        createFormHeader = document.createElement("a");
        createFormHeader.textContent = "Create Form";
        createFormHeader.setAttribute("class","header");
        createFormHeader.setAttribute("style","display: unset");
        createFormHeader.setAttribute("id","createFormHeader");
        createFormHeader.addEventListener("click",createFormPage);

        header.appendChild(createFormHeader);
    }

    createFormHeader.setAttribute("style","display: unset");
}