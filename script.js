// Select elements
const addBtn = document.getElementById("add-task");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Task array to hold all tasks
let tasks = [];

// Save tasks to localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => renderTask(task));
    }
}

// Render a single task to the DOM
function renderTask(task) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("task-text");
    if (task.completed) {
        span.classList.add("completed");
    }

    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        span.classList.toggle("completed");
        saveTasksToLocalStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter(t => t !== task); // remove from array
        li.remove();                           // remove from DOM
        saveTasksToLocalStorage();             // save changes
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    renderTask(newTask);
    saveTasksToLocalStorage();

    taskInput.value = "";
    taskInput.focus();
}

// Event Listeners
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Load any saved tasks when the page loads
loadTasksFromLocalStorage();