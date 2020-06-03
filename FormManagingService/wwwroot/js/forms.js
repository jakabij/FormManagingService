let questionCounter = 0;


function saveForm(form){
    


    questionCounter = 0;
}


function addQuestion(formStack, counter){   //Generate the questions

    console.log(counter)

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


function createFormPage(){          //int this page you can create forms and save it to the database
    questionCounter = 0;

    let createFormPage = document.querySelector("#questionForms");
    createFormPage.setAttribute("style","display: unset");

    let questionButton = document.createElement("input");
    questionButton.setAttribute("type","button");
    questionButton.setAttribute("id", "addQuestionButton");
    questionButton.setAttribute("value", "+");
    questionButton.addEventListener("click", ()=>{
        addQuestion(createFormPage, questionCounter)
    });

    createFormPage.appendChild(questionButton);
}


function hideFormMakingHeader(){
    let header = document.querySelector("#headerBlock");

    let createFormHeader = document.querySelector("#createFormHeader");
    header.removeChild(createFormHeader);

    let createFormPage = document.querySelector("#questionForms");
    createFormPage.setAttribute("style","display: none");
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