initializeDOM()
setHeaderDate() 

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

renderTasks()

todoInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && event.target.value != '') {
      let taskName = event.target.value  
      let taskObject = {
        id: Date.now().toString(),
        name: taskName,
        done: false
      }
      tasks.push(taskObject)
      save()
      renderTasks()
      event.target.value = ''
    }
  });

  clearCompletedTasks.addEventListener('click', function(event) {
    tasks = tasks.filter(task => !task.done)
    save()
    renderTasks()
  })

  todosList.addEventListener('click', function(event){
    if(event.target.tagName === 'LI'){
        event.target.classList.toggle('checked')
        renderTasksRemaining()
        const selectedTask = tasks.find(tasks => tasks.id === event.target.id)
        selectedTask.done = !selectedTask.done
        save()
    }
    renderTasks()
  })


function renderTasks(){
    todosList.innerHTML = ''
    tasks.length === 0 ? noTasks.classList.remove('hidden'): noTasks.classList.add('hidden')
    for(let i = 0; i < tasks.length; i++){
        todosList.innerHTML += `
        <li class="todo-list ${tasks[i].done === true ? 'checked' : ''}" id="${tasks[i].id}">
            ${tasks[i].name}
        </li>`
    }
    renderTasksRemaining()
}


function setHeaderDate(){
    dateArrays()
    headerDate.textContent = `${weekdayArray[weekday]}, ${day} ${monthsArray[month]}` 
}


function initializeDOM(){
    headerDate = document.getElementById('header-date')
    currentDay = document.getElementById('current-day')
    todoInput = document.querySelector('[data-todo-input]')
    todosList = document.querySelector('[data-todos-list]')
    tasksRemaining = document.querySelector('[data-tasks-remaining]')
    clearCompletedTasks = document.querySelector('[data-clear-completed-tasks]')
    noTasks = document.querySelector('[data-no-tasks-today]')
}


function dateArrays(){
    monthsArray = [
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December'
    ]

    weekdayArray = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]


    today = new Date()
    day = today.getDate()
    weekday = today.getDay()
    month = today.getMonth()
}


function renderTasksRemaining(){
    let totalTasksRemaining = tasks.filter(tasks => tasks.done === false)
    if(totalTasksRemaining.length == 0 ){
        tasksRemaining.textContent = ''
    } else {
        tasksLeft = totalTasksRemaining.length
        tasksString = totalTasksRemaining.length === 1 ? 'task' : 'tasks'
        tasksRemaining.textContent = `${tasksLeft} ${tasksString} remaining`
    }
}


function save(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

