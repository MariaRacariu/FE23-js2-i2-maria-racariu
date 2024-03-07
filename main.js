import { fetchData, postData } from "./modules/CRUD.js";
fetchData();
const postButton = document.querySelector("#postButton").addEventListener("click", postData);