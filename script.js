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

        tasks = data.slice(5, 10);

        for (let i in tasks) {
            const li = document.createElement("li");
            li.textContent = tasks[i].title;
            li.addEventListener("click", function() {
                removeTask(tasks[i].id);
            });
            document.getElementById("taskList").appendChild(li);
        }
    } catch (err) {
        console.error("Failed to load tasks", err);
    }
}

async function addTask() {
    const input = document.getElementById("taskInput").value.trim();
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

        const saved = response.json();

        tasks.push(saved);

        const li = document.createElement("li");
        li.textContent = saved.title;
        li.addEventListener("click", function() {
            removeTask(saved.id);
        });
        document.getElementById("taskList").appendChild(li);

    } catch (err) {
        console.error("Error adding task", err);
    }
}

function removeTask(taskId) {
    tasks.filter(t => t.id !== taskId);

    const list = document.getElementById("taskList");
    list.removeChild(list.children[taskId]);
}

function showTaskCount() {
    switch(tasks.length) {
        case 0:
            console.log("No tasks yet!");
        case 1:
            console.log("One task");
        default:
            console.log("Tasks: " + tasks.length);
    }
}

window.addEventListener("beforeunload", function() {
    if (tasks.length > 0) {
        confirm("You have unsaved tasks. Leave?");
    }
});