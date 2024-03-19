import { fetchData, postData, displayTasks } from "./modules/CRUD.js";

fetchData().then(displayTasks);

const postButton = document.querySelector("#postButton");
postButton.addEventListener("click", (event) => {
    event.preventDefault();
    postData();
})