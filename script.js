
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const clearAllBtn = document.getElementById("clearAllBtn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function displayTasks() {

    taskList.innerHTML = "";
    if (tasks.length === 0) {
        emptyState.style.display = "flex";
        return;
    }

    emptyState.style.display = "none";
    tasks.forEach(function(task, index) {
        const taskCard = document.createElement("div");
        taskCard.className = "task-card";
        if (task.completed) {
            taskCard.classList.add("completed");
        }
        taskCard.innerHTML = `
            <input
                type="checkbox"
                class="task-check"
                ${task.completed ? "checked" : ""}
            >
            <span class="task-text">
                ${escapeHTML(task.text)}
            </span>
            <button class="delete-task">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
            
        `;
        const checkbox =
            taskCard.querySelector(".task-check");
        checkbox.addEventListener("change", function() {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        const deleteButton =
            taskCard.querySelector(".delete-task");
        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
            alert("Task successfully deleted!.");
        });
        taskList.appendChild(taskCard);

    });

}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task.");
        taskInput.focus();
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    taskInput.value = "";
    taskInput.focus();
    displayTasks();

}

addBtn.addEventListener("click", function() {
  addTask();

});
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

clearAllBtn.addEventListener("click", function() {
    if (tasks.length === 0) {
        return;
    }

    const confirmDelete =
        confirm("Are you sure you want to clear all tasks?");

    if (confirmDelete) {
        tasks = [];
        saveTasks();
        displayTasks();

        alert("All tasks successfully deleted!");
    }
});

clearCompletedBtn.addEventListener("click", function() {
    tasks = tasks.filter(function(task) {
        return !task.completed;
    });
    saveTasks();
    displayTasks();

});

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

displayTasks();