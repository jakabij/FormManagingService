function createFormPage(){
    let createFormPage = document.querySelector("#questionForms");
    createFormPage.setAttribute("style","display: unset");
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
}