import { handleFaqButtonClick } from "../../router";
document.addEventListener("modalDisplayed",()=>{
    console.log("Faq" , document.getElementById('navigateToFaq'));
    document.getElementById('navigateToFaq').addEventListener('click', handleFaqButtonClick);
})
