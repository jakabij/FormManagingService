let questionCounter = 0;
let emailAdressCounter = 1;


function sendToUsers(form){
    // let data = new FormData();
    // for(let count = 0; count < emailAdressCounter; count++){
    //     let dataElementName = "email" + count;
    //     data.append(dataElementName, document.forms["emailAddingForm"][dataElementName].value);
    // }


    emailAdressCounter = 1;
}


function addMoreEmail(){
    emailAdressCounter++;
    let emailAddingPage = document.querySelector("#emailAddingForm");

    emailAddingPage.appendChild(document.createElement("br"));
    emailAddingPage.appendChild(document.createElement("br"));

    let emailText = document.createElement("a");
    emailText.textContent = "Email:"
    emailAddingPage.appendChild(questionText);

    emailAddingPage.appendChild(document.createElement("br"));

    let anotherEmail = document.createElement("input");

    anotherEmail.setAttribute("type", "text");
    let emailID = "email" + emailAdressCounter;
    anotherEmail.setAttribute("name", emailID);
}


function showEmailAddingPage(){
    let emailAddingPage = document.querySelector("#emailAddingForm");
    emailAddingPage.setAttribute("style", "display: unset");

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
    emailAddingPage.appendChild(questionText);

    emailAddingPage.appendChild(document.createElement("br"));

    let firstEmail = document.createElement("input");
    firstEmail.setAttribute("type", "text");
    firstEmail.setAttribute("name", "email1");

    emailAddingPage.appendChild(firstEmail);
}


function hideFormMakingPage(){
    let formMakingPage = document.querySelector("#questionForms");
    
    for(let count = 1; count < formMakingPage.childElementCount; count++){
        formMakingPage.removeChild(formMakingPage.children[count]);
    }

    formMakingPage.setAttribute("style", "display :none");
}


function sendDataToForms(destination, data){
    let xhr = new XMLHttpRequest();
    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                hideFormMakingHeader();
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
    questionCounter += 1;
}


function createFormPage(){          //in this page you can create forms and save it to the database
    questionCounter = 0;

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
}


function hideFormMakingHeader(){
    // let header = document.querySelector("#headerBlock");

    let createFormHeader = document.querySelector("#createFormHeader");
    // header.removeChild(createFormHeader);

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

    // console.log(currentProfileEmail)
    // console.log(currentProfileID)
}