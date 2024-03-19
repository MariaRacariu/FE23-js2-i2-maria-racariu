// This file consist of all the CRUD functionality

const databaseLink = "https://scrum-board-4eb67-default-rtdb.europe-west1.firebasedatabase.app/tasks.json";

export async function fetchData() {
    const response = await fetch(databaseLink);
    const data = await response.json();
    // console.log(data);
    return data;
}

export function postData() {

    const taskInfo = document.querySelector("#taskInfo").value;
    const category = document.querySelector("#cat").value;
    const postTaskForm = document.querySelector("#postTaskForm");

    const dataStructure = {
        assigned: "",
        category: category,
        status: "to do",
        task: taskInfo,
    }

    postData(databaseLink, dataStructure)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })

    async function postData(databaseLink = "", dataStructure = {}) {
        const response = await fetch(databaseLink, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataStructure),
        });
        postTaskForm.reset();
        fetchData().then(displayTasks);
        return await response.json();
    }
}

async function assignTask(task, assignedPerson) {
    const dataStructure = {
        assigned: assignedPerson,
        status: "in progress",
    }
    const response = await fetch(`https://scrum-board-4eb67-default-rtdb.europe-west1.firebasedatabase.app/tasks/${task}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataStructure),
    });
    fetchData().then(displayTasks);
    return response.json();
}

async function doneTask(task) {

    const dataStructure = {
        status: "done",
    }
    const response = await fetch(`https://scrum-board-4eb67-default-rtdb.europe-west1.firebasedatabase.app/tasks/${task}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataStructure),
    });
    fetchData().then(displayTasks);
    return response.json();
}

async function deleteTask(task) {
    try {
        const response = await fetch(`https://scrum-board-4eb67-default-rtdb.europe-west1.firebasedatabase.app/tasks/${task}.json`, {
            method: "DELETE",
        });
        if (response.ok) {
            fetchData().then(displayTasks);
            console.log("Task Deleted");
        } else {
            console.log("Task was not deleted");
        }
    } catch (error) {
        console.log(error);
    }
}

export function displayTasks(data) {
    const todoContainer = document.querySelector("#todoContainer");
    const inProgressContainer = document.querySelector("#inProgressContainer");
    const doneContainer = document.querySelector("#doneContainer");

    todoContainer.innerHTML = "";
    inProgressContainer.innerHTML = "";
    doneContainer.innerHTML = "";

    for (const task in data) {
        // console.log(data[task].task);

        const taskContainer = document.createElement("div");
        taskContainer.classList.add("card");

        const taskInfo = document.createElement("p");
        taskInfo.innerText = `${data[task].task} - ${data[task].assigned}`;
        taskContainer.appendChild(taskInfo);

        if (data[task].status === "to do") {
            todoContainer.appendChild(taskContainer);

            taskInfo.innerText = data[task].task;
            const assignForm = document.createElement("form");
            assignForm.method = "POST";
            taskContainer.appendChild(assignForm);

            const assignInput = document.createElement("input");
            assignForm.appendChild(assignInput);
            assignInput.type = "text";
            assignInput.name = "assign";
            assignInput.placeholder = "Enter Name";

            const assignInputButton = document.createElement("button");
            assignForm.appendChild(assignInputButton);
            assignInputButton.type = "submit";
            assignInputButton.innerText = "Assign";

            assignInputButton.addEventListener("click", (event) => {
                event.preventDefault();
                const assignedPerson = assignInput.value;
                assignTask(task, assignedPerson);
            })

        } else if (data[task].status === "in progress") {
            inProgressContainer.appendChild(taskContainer);

            if (data[task].assigned === null || undefined) {
                todoContainer.appendChild(taskContainer);
            }

            const assignForm = document.createElement("form");
            taskContainer.appendChild(assignForm);

            const doneButton = document.createElement("button");
            assignForm.appendChild(doneButton);
            doneButton.type = "submit";
            doneButton.innerText = "Done ✓";

            doneButton.addEventListener("click", (event) => {
                event.preventDefault();
                doneTask(task);
            })
        } else if (data[task].status === "done") {
            doneContainer.appendChild(taskContainer);

            const assignForm = document.createElement("form");
            taskContainer.appendChild(assignForm);

            const deleteButton = document.createElement("input");
            assignForm.appendChild(deleteButton);
            deleteButton.type = "button";
            deleteButton.value = "Delete X";

            deleteButton.addEventListener("click", () => {
                deleteTask(task);
            })
        }

        if (data[task].category === "ux") {
            taskContainer.classList.add("uxCard");

        } else if (data[task].category === "dev backend") {
            taskContainer.classList.add("devBackendCard");

        } else if (data[task].category === "dev frontend") {
            taskContainer.classList.add("devFrontendCard");
        }
    }
}