import { readTask, createTask } from "./modules/crud.js";
const databaseLink = "https://scrum-board-4eb67-default-rtdb.europe-west1.firebasedatabase.app/tasks.json";

async function fetchData() {
    const response = await fetch(databaseLink);
    const data = await response.json();
    console.log(data);
    readTask(data);
}

fetchData();

const postButton = document.querySelector("#postButton").addEventListener("click", createTask);