initializeDOM();
setHeaderDate();

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

todoInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

addTaskButton.addEventListener("click", function() {
    addTask();
});

clearCompletedTasks.addEventListener('click', function() {
    tasks = tasks.filter(task => !task.done);
    save();
    renderTasks();
});

todosList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        const selectedTask = tasks.find(task => task.id === event.target.id);

        if (selectedTask) {
            selectedTask.done = !selectedTask.done;
            save();
            renderTasks();
        }
    }
});

function initializeDOM() {
    headerDate = document.getElementById('header-date');
    todoInput = document.querySelector('[data-todo-input] input');
    addTaskButton = document.getElementById('add-task-btn');
    todosList = document.querySelector('[data-todos-list]');
    tasksRemaining = document.querySelector('[data-tasks-remaining]');
    clearCompletedTasks = document.querySelector('[data-clear-completed-tasks]');
    noTasks = document.querySelector('[data-no-tasks-today]');
}

function addTask() {
    const taskName = todoInput.value.trim();

    if (taskName !== '') {
        const taskObject = {
            id: Date.now().toString(),
            name: taskName,
            done: false
        };

        tasks.push(taskObject);
        save();
        renderTasks();
        todoInput.value = '';
    }
}

function renderTasks() {
    todosList.innerHTML = '';

    if (tasks.length === 0) {
        noTasks.classList.remove('hidden');
    } else {
        noTasks.classList.add('hidden');
    }

    for (let i = 0; i < tasks.length; i++) {
        todosList.innerHTML += `
            <li class="todo-list ${tasks[i].done ? 'checked' : ''}" id="${tasks[i].id}">
                ${tasks[i].name}
            </li>
        `;
    }

    renderTasksRemaining();
}

function setHeaderDate() {
    dateArrays();
    headerDate.textContent = `${weekdayArray[weekday]}, ${day} ${monthsArray[month]}`;
}

function dateArrays() {
    monthsArray = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    weekdayArray = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ];

    today = new Date();
    day = today.getDate();
    weekday = today.getDay();
    month = today.getMonth();
}

function renderTasksRemaining() {
    let totalTasksRemaining = tasks.filter(task => task.done === false);

    if (totalTasksRemaining.length === 0) {
        tasksRemaining.textContent = '';
    } else {
        let tasksLeft = totalTasksRemaining.length;
        let tasksString = totalTasksRemaining.length === 1 ? 'task' : 'tasks';
        tasksRemaining.textContent = `${tasksLeft} ${tasksString} remaining`;
    }
}

function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
