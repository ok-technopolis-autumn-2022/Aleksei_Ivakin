const form = document.querySelector('.taskInput_inputField');
const ul = document.querySelector('.tasksList');
let tasks = [];
let tasks_li = [];
const all_button = document.getElementById('sallb');
const active_button = document.getElementById('sactiveb');
const complete_button = document.getElementById('scomplb');
const clear_complete_button = document.querySelector('.clearCompletedButton');
const complete_all_button = document.querySelector('.taskInput_selectAllButton');
const count_info = document.querySelector('.countInfo');

function updateCounter() {
    count_info.innerHTML = String(tasks.filter(task => !task.isComplete).length + " items left")
}

function addTask(e) {
    e.preventDefault();
    if (this.newTaskText.value.length !== 0) {
        const task = createTask(this.newTaskText.value);
        const li = createLi(task);
        ul.appendChild(li);
        tasks.push(task);
        tasks_li.push(li);
        updateCounter();
        this.reset();
    }
}

/**
 *
 * @param task{{id: string|number, text: string, isComplete: boolean}}
 * @returns {HTMLLIElement}
 */
export function createLi(task) {
    const li = document.createElement('li');
    li.id = task.id;
    li.className = "itemList";

    const itemList_task = document.createElement('div');
    itemList_task.className = "itemList_task";

    const input = document.createElement('input');
    input.className = "task_CheckButton";
    input.type = "checkbox";
    const input_id = task.id + 1;
    input.id = input_id;
    input.title = "Выполнение задачи";
    const checkTask = () => {
        task.isComplete = !task.isComplete;
        updateCounter();
    }
    input.addEventListener('change', checkTask)

    const label = document.createElement('label');
    label.className = "task_Label";
    label.htmlFor = input_id;
    label.ariaLabel = "Задача";

    const span = document.createElement('span');
    span.className = "task_Text";
    span.textContent = task.text;

    const button = document.createElement('button');
    button.className = "task_DeleteButton";
    button.title = "Удалить задачу";

    const img = document.createElement('img');
    img.alt = "Cross";
    img.src = "http://localhost:1234/cross.b107c138.svg"

    button.appendChild(img);
    const deleteTask = () => {
        button.removeEventListener('click', deleteTask);
        tasks_li = tasks_li.filter(task_li => task_li.id !== li.id);
        tasks = tasks.filter(task => task.id !== Number(li.id));
        updateCounter();
        li.remove();
    }
    button.addEventListener('click', deleteTask);

    itemList_task.append(input, label, span, button);
    li.appendChild(itemList_task);

    return li;
}

export function createTask(str) {
    return {
        id: Date.now(),
        text: str,
        isComplete: false
    }
}

function showAllTasks() {
    tasks_li.forEach(li => ul.appendChild(li));
}

function showActiveTasks() {
    tasks_li.forEach(li => li.remove());
    const active_tasks = tasks.filter(task => !task.isComplete);
    active_tasks.forEach(task => ul.appendChild(tasks_li.find(li => Number(li.id) === task.id)));
}

function showCompletedTasks() {
    tasks_li.forEach(li => li.remove());
    const unactive_tasks = tasks.filter(task => task.isComplete);
    unactive_tasks.forEach(task => ul.appendChild(tasks_li.find(li => Number(li.id) === task.id)));
}

function clearCompletedTasks() {
    const unactive_tasks = tasks.filter(task => task.isComplete);
    unactive_tasks.forEach(task => tasks_li.find(li => Number(li.id) === task.id).firstChild.childNodes[3].click());
}

function completeAllTasks(e) {
    e.preventDefault();
    const unactive_tasks = tasks.filter(task => !task.isComplete);
    unactive_tasks.forEach(task => tasks_li.find(li => Number(li.id) === task.id).firstChild.firstChild.click());
    updateCounter();
}

form.addEventListener('submit', addTask);
all_button.addEventListener('focus', showAllTasks);
active_button.addEventListener('focus', showActiveTasks);
complete_button.addEventListener('focus', showCompletedTasks);
clear_complete_button.addEventListener('focus', clearCompletedTasks);
complete_all_button.addEventListener('focus', completeAllTasks);