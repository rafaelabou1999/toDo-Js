const inputToValidate = document.querySelectorAll('.input-toValidate');
const btnTask = document.querySelector(".btn-task");
const input = document.querySelector(".input");
const all = document.querySelector(".geral");
const taskList = document.querySelector("ul");

function createAnyElement(selector) {
    const element = document.createElement(selector);
    return element;
}

const taskP = createAnyElement('p');
function invalidInput() {
    inputToValidate.forEach((curr) => {
        input.style.border = '1px solid #AA4A44'
        taskP.innerHTML = `<div><i class="fa-solid fa-circle-exclamation"></i> Please, enter a task.</div>`
        taskP.style.fontSize = '.7rem';
        taskP.style.color = '#AA4A44';
        curr.appendChild(taskP);
        const emptyTask = createLi();
        emptyTask.remove();
    })
}

function isEmpty() {
    if (!input.value.trim()) {
        invalidInput();
    } else {
        taskP.remove();
        input.style.border = '1px solid #000'
    }
}

function createList(inputTxt) {
    const task = createAnyElement('li');
    task.textContent = inputTxt;
    task.style.display = "flex";
    task.style.flexDirection = 'row';
    task.setAttribute("data-task-id", allTasks.length);
    taskList.appendChild(task)
    createCheck(task);
    task.classList.add('active');
    allTasks.push(task);
    saveList();
    return task;
}

function createBtnDelete(task) {
    const btnDelete = createAnyElement('button');
    btnDelete.innerHTML = `<i class="fa-sharp fa-solid fa-trash"></i>`;
    task.appendChild(btnDelete);
    task.style.position = 'relative'
    btnDelete.style.position = "absolute";
    btnDelete.style.right = '8%';
    btnDelete.style.top = '7%';
    btnDelete.style.color = 'rgb(18, 149, 201)';
    btnDelete.style.backgroundColor = 'transparent';
    btnDelete.style.border = 'none';
    btnDelete.style.padding = '.3rem';
    return btnDelete;
}

function deleteTask(task) {
    const taskId = parseInt(task.getAttribute('data-task-id'));
    task.remove();

    if (task.classList.contains("completed")) {
        completeTasks = completeTasks.filter(task => parseInt(task.getAttribute('data-task-id')) !== taskId);
        saveList();
    } else {
        activeTasks = activeTasks.filter(task => parseInt(task.getAttribute('data-task-id')) !== taskId);
        saveList();
    }
    allTasks = allTasks.filter(task => parseInt(task.getAttribute('data-task-id')) !== taskId);
    updateDisplay(allTasks);
}

let completeTasks = [];
let activeTasks = [];

function createCheck(li) {
    const box = createAnyElement('div');
    box.innerHTML = `<i class="fa-regular fa-square"></i>`;
    box.style.marginRight = "3%";
    li.insertBefore(box, li.firstChild);
    box.style.color = 'rgb(18, 149, 201)';
    li.classList.add('allTasks');
    box.addEventListener("click", () => {
        box.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
        box.style.color = 'rgb(18, 149, 201)';
        li.style.textDecoration = 'line-through';

        if (!isChecked) {
            box.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
            li.style.textDecoration = 'line-through';
            li.style.color = "#808080";
            li.classList.add('completed');
            li.classList.remove('active')
            completeTasks.push(li);
            activeTasks = activeTasks.filter(task => task !== li);
            saveList();
        } else {
            box.innerHTML = `<i class="fa-regular fa-square"></i>`;
            li.style.textDecoration = 'none';
            li.style.color = "#000";
            li.classList.add("active");
            li.classList.remove('completed')
            completeTasks = completeTasks.filter(task => task !== li);
            saveList();
        }
        isChecked = !isChecked;
    })
    return box;
}

let allTasks = [];
let listItem = '';
btnTask.addEventListener("click", () => {
    isEmpty();

    if (input.value.trim() !== '') {
        listItem = createList(input.value);
        const deleteButton = createBtnDelete(listItem);

        deleteButton.addEventListener("click", () => {
            deleteTask(listItem);
        });
        input.value = '';
        return listItem;
    }
    createCheck(input.value);
})

let isChecked = false;



// e.keyCode = enter
input.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
        isEmpty();

        if (input.value.trim() !== '') {
            const listItem = createList(input.value);
            const deleteButton = createBtnDelete(listItem);

            deleteButton.addEventListener("click", () => {
                deleteTask(listItem);
            });

            input.value = '';
        }

        createCheck(input.value);
    }
})


const activeTab = document.querySelector(".activeTab");
const allTab = document.querySelector(".allTab");
const completedTab = document.querySelector(".completedTab");
const isActiveTab = false;
allTab.style.color = 'rgb(18, 149, 201)';
function updateDisplay(tasks) {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        taskList.appendChild(task);

    })
}

allTab.addEventListener("click", () => {
    allTab.style.color = 'rgb(18, 149, 201)';
    completedTab.style.color = '';
    activeTab.style.color = '';
    updateDisplay(allTasks);
})
completedTab.addEventListener("click", () => {
    allTab.style.color = '';
    completedTab.style.color = 'rgb(18, 149, 201)';
    activeTab.style.color = '';
    updateDisplay(completeTasks);
})
activeTab.addEventListener("click", () => {
    allTab.style.color = '';
    completedTab.style.color = '';
    activeTab.style.color = 'rgb(18, 149, 201)';
    const newArray = allTasks.filter(item => item.classList.contains('active'));
    updateDisplay(newArray);
})


function saveList() {
    let taskArray = [];

    for (let task of allTasks) {
        let taskObject = {
            text: task.innerText,
            completed: task.classList.contains('completed')
        }
        taskArray.push(taskObject);
    }

    let taskJSON = JSON.stringify(taskArray);
    localStorage.setItem('tasks', taskJSON);
}

function addingSavedTasks() {
    let tasks = localStorage.getItem('tasks');
    const tasksList = JSON.parse(tasks);

    for (let taskData of tasksList) {
        const listItem = createList(taskData.text);
        if (taskData.completed) {
            listItem.style.textDecoration = 'line-through';
            listItem.style.color = "#808080";
            listItem.classList.add('completed');
            listItem.classList.remove('active');
            completeTasks.push(listItem);
        } else {
            activeTasks.push(listItem);
        }
        const deleteButton = createBtnDelete(listItem);

        deleteButton.addEventListener("click", () => {
            deleteTask(listItem);
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    addingSavedTasks();
});