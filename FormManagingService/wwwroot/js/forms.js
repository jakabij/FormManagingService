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
    showSentFormsPageHeader();

    let data = new FormData();
    data.append("adminID", currentProfileID);
    data.append("emailCount", emailAdressCounter);

    for(let count = 0; count < emailAdressCounter; count++){
        let dataElementName = "email" + (count + 1);
        data.append(dataElementName, document.forms["emailAddingForm"][dataElementName].value);
    }

    sendDataToFormsEmail("Form/AddUsersToForm", data);

    emailAdressCounter = 1;
}


function addMoreEmail(){
    emailAdressCounter++;
    let emailAddingPage = document.querySelector("#emailAddingForm");

    emailAddingPage.appendChild(document.createElement("br"));
    emailAddingPage.appendChild(document.createElement("br"));

    let emailText = document.createElement("a");
    emailText.textContent = "Email:"
    emailAddingPage.appendChild(emailText);

    emailAddingPage.appendChild(document.createElement("br"));

    let anotherEmail = document.createElement("input");
    anotherEmail.setAttribute("type", "text");
    let emailID = "email" + emailAdressCounter;
    anotherEmail.setAttribute("name", emailID);

    emailAddingPage.appendChild(anotherEmail);
}


function showEmailAddingPage(){
    hideSentFormsPageHeader();
    hideFormMakingHeader();

    let emailAddingPage = document.querySelector("#emailAddingForm");
    emailAddingPage.setAttribute("style", "display: unset");

    emailAddingPage.appendChild(document.createElement("br"));

    let addMoreEmailButton = document.createElement("input");
    addMoreEmailButton.setAttribute("type", "button");
    addMoreEmailButton.setAttribute("value", "Click to add more Email");
    addMoreEmailButton.setAttribute("id", "addMoreEmailButton");
    addMoreEmailButton.addEventListener("click", addMoreEmail);

    emailAddingPage.appendChild(addMoreEmailButton);

    emailAddingPage.appendChild(document.createElement("br"));
    emailAddingPage.appendChild(document.createElement("br"));

    let emailText = document.createElement("a");
    emailText.textContent = "Email:"
    emailAddingPage.appendChild(emailText);

    emailAddingPage.appendChild(document.createElement("br"));

    let firstEmail = document.createElement("input");
    firstEmail.setAttribute("type", "text");
    firstEmail.setAttribute("name", "email1");

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
        for(let i = 0; i < questionCounter; i++){
            let questionID = "question" + i;
            data.append(questionID, document.forms["questionForm"][questionID].value);
        }

        sendDataToForms("Form/AddForm", data);

        questionCounter = 0;
    }
}


function addQuestion(formStack, counter){   //Generate the questions
    formStack.appendChild(document.createElement("br"));

    let questionText = document.createElement("a");
    questionText.textContent = "What is going to be the question?"
    formStack.appendChild(questionText);
    formStack.appendChild(document.createElement("br"));

    let question = document.createElement("input");

    let questionId = "question" + counter;
    question.setAttribute("id", questionId);
    question.setAttribute("name", questionId);

    formStack.appendChild(question);
    formStack.appendChild(document.createElement("br"));
    questionCounter ++;


    console.log("Question number: "+questionCounter)
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

    let createFormPage = document.querySelector("#questionForms");
    createFormPage.setAttribute("style","display: unset");

    let questionButton = document.createElement("input");
    questionButton.setAttribute("type","button");
    questionButton.setAttribute("id", "addQuestionButton");
    questionButton.setAttribute("value", "Add Question");
    questionButton.addEventListener("click", ()=>{
        addQuestion(createFormPage, questionCounter)
    });

    createFormPage.appendChild(questionButton);

    createFormPage.appendChild(document.createElement("br"));

    let titleText = document.createElement("a");
    titleText.textContent = "The title of the form:"
    createFormPage.appendChild(titleText);

    createFormPage.appendChild(document.createElement("br"));
    let titleInput = document.createElement("input");
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

    let createFormHeader = document.createElement("a");
    createFormHeader.textContent = "Create Form";
    createFormHeader.setAttribute("class","header");
    createFormHeader.setAttribute("style","display: unset");
    createFormHeader.setAttribute("id","createFormHeader");
    createFormHeader.addEventListener("click",createFormPage);

    header.appendChild(createFormHeader);
}