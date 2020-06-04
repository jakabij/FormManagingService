function afterSendingEmails(wrongEmails){
    wrongEmails.forEach(element => console.log(element))

    let afterSendingPage = document.querySelector("#afterSendingForms");
    afterSendingPage.setAttribute("style", "display: unset");

    if(wrongEmails === null){
        let text = document.createElement("a");
        text.textContent = "Successfully sent all of the forms to the emails.";

        afterSendingPage.appendChild(text);
    }else{
        wrongEmails.forEach(element => {
            let text = document.createElement("a");
            text.textContent = "Failed to send form to " + element;

            afterSendingPage.appendChild(text);
            afterSendingPage.appendChild(document.createElement("br"));
        })
        
    }
}