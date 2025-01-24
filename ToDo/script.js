const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

// Event listeners
addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Function to add a new todo
function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        alert('Task cannot be empty!');
        return;
    }

    // Prevent duplicate tasks
    const existingTodos = Array.from(todoList.children).map(li => li.textContent.replace('❌', '').trim());
    if (existingTodos.includes(todoText)) {
        alert('Task already exists!');
        return;
    }

    const li = document.createElement('li');


    li.innerHTML = `
        <span class="task-text">${todoText}</span>
        <button class="delete-btn">❌</button>
    `;
    li.addEventListener('click', toggleComplete);

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent triggering toggleComplete
        deleteTask(li);
    });

    todoList.appendChild(li);
    todoInput.value = '';
}

function toggleComplete(e) {
    const taskText = this.querySelector('.task-text');
    taskText.classList.toggle('completed');
}

function deleteTask(taskElement) {
    todoList.removeChild(taskElement);
}
