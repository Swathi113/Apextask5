const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTodos);

// Add a task
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task) {
    addTodoToList(task);
    saveTodoToLocalStorage(task);
    todoInput.value = '';
  }
});

// Add task to the UI
function addTodoToList(task) {
  const li = document.createElement('li');
  li.innerHTML = `${task} <button onclick="deleteTodo(this)">Delete</button>`;
  todoList.appendChild(li);
}

// Save task to localStorage
function saveTodoToLocalStorage(task) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(task);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Load tasks from localStorage
function loadTodos() {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach((task) => addTodoToList(task));
}

// Delete task from UI and localStorage
function deleteTodo(button) {
  const task = button.parentElement.textContent.trim().replace('Delete', '');
  button.parentElement.remove();
  let todos = JSON.parse(localStorage.getItem('todos'));
  todos = todos.filter((todo) => todo !== task);
  localStorage.setItem('todos', JSON.stringify(todos));
}