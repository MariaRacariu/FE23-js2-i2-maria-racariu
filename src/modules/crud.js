const todoContainer = document.querySelector("#todoContainer");
const inProgressContainer = document.querySelector("#inProgressContainer");
const doneContainer = document.querySelector("#doneContainer");

export function createTask() {
    const taskInfo = document.querySelector("#taskInfo").value;
    const cat = document.querySelector("#cat").value;
    // console.log(taskInfo);
    // console.log(cat);

    const data = {
        assigned: "",
        category: cat,
        status: "to do",
        task: taskInfo,
    }

    console.log(data);

    postData("https://scrum-board-4eb67-default-rtdb.europe-west1.firebasedatabase.app/tasks.json", data)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(`Error: ${error}!!!`);
        })

    async function postData(url = "", data = {}) {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        return await response.json();
    }
}

export function readTask(data) {
    for (const task in data) {
        // console.log(data[task].task);
        function createElements(parent) {
            const taskContainer = document.createElement("div");
            taskContainer.classList = "card";
            parent.appendChild(taskContainer);

            const taskInfo = document.createElement("p");
            taskInfo.innerText = `${data[task].task} - ${data[task].assigned}`;
            taskContainer.appendChild(taskInfo);

            if (data[task].status === "to do") {
                taskInfo.innerText = data[task].task;
                const assignForm = document.createElement("form");
                taskContainer.appendChild(assignForm);

                const assignInput = document.createElement("input");
                assignForm.appendChild(assignInput);
                assignInput.type = "text";
                assignInput.name = "assign";
                assignInput.placeholder = "Enter Name";

                const assignInputButton = document.createElement("input");
                assignForm.appendChild(assignInputButton);
                assignInputButton.type = "button";
                assignInputButton.value = "Assign";
            } else if (data[task].status === "in progress") {
                const assignForm = document.createElement("form");
                taskContainer.appendChild(assignForm);

                const doneButton = document.createElement("input");
                assignForm.appendChild(doneButton);
                doneButton.type = "button";
                doneButton.value = "Done";
            } else if (data[task].status === "done") {
                const assignForm = document.createElement("form");
                taskContainer.appendChild(assignForm);

                const deleteButton = document.createElement("input");
                assignForm.appendChild(deleteButton);
                deleteButton.type = "button";
                deleteButton.value = "Delete";
            }
        }

        if (data[task].status === "to do") {
            createElements(todoContainer);

        } else if (data[task].status === "in progress") {
            createElements(inProgressContainer);
            if (data[task].assigned === null || undefined) {
                createElements(todoContainer);
            }

        } else if (data[task].status === "done") {
            createElements(doneContainer);

        }

    }
}