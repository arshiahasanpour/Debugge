let tasks = [];
const apiUrl = "https://jsonplaceholder.typicode.com/todos";

document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("loadBtn").addEventListener("click", loadTasks);
document.getElementById("showCount").addEventListener("click", showTaskCount);

async function loadTasks() {
    console.log("Loading tasks...");
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const newTasks = data.slice(5, 10);

        const taskListEl = document.getElementById("taskList");

        newTasks.forEach(task => {

            tasks.push(task);

            const li = document.createElement("li");
            li.textContent = task.title;
            li.addEventListener("click", function() {
                removeTask(task.title);
            });
            taskListEl.appendChild(li);
        });

    } catch (err) {
        console.error("Failed to load tasks", err);
    }
}

async function addTask() {
    const inputEl = document.getElementById("taskInput");
    const input = inputEl.value.trim();

    if (input === "") {
        alert("Please enter a valid task");
        return;
    }

    const newTask = { title: input, completed: false };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        const saved = await response.json();

        tasks.push(saved);

        const li = document.createElement("li");
        li.textContent = saved.title;
        li.addEventListener("click", function() {
            removeTask(saved.title);
        });
        document.getElementById("taskList").appendChild(li);

        inputEl.value = "";

    } catch (err) {
        console.error("Error adding task", err);
    }
}

function removeTask(taskTitle) {
    tasks = tasks.filter(t => t.title !== taskTitle);

    const list = document.getElementById("taskList");
    list.querySelectorAll("li").forEach(li => {
        if (li.textContent === taskTitle) {
            li.remove();
        }
    });
}

function showTaskCount() {
    switch(tasks.length) {
        case 0:
            console.log("No tasks yet!");
            break
        case 1:
            console.log("One task");
            break
        default:
            console.log("Tasks: " + tasks.length);
    }
}

window.addEventListener("beforeunload", function(event) {
    if (tasks.length > 0) {
        event.preventDefault();
    }
});