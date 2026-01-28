const API_URL = "http://localhost:5000/tasks";

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

// Fetch all tasks
async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.title;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTask(task._id);

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Add new task
async function addTask() {
  if (!taskInput.value.trim()) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: taskInput.value })
  });

  taskInput.value = "";
  fetchTasks();
}

// Delete task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  fetchTasks();
}

// Load tasks on page load
fetchTasks();
