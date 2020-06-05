function appendShowSentFormsPage(element){
    
    console.log(element)

    console.log(element.title)
}


function sendDataToSentForms(destination, data){
    let xhr = new XMLHttpRequest();
    if (xhr != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let result = JSON.parse(xhr.responseText);

                console.log(result)
                
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