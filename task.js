import {todo_app_data} from "./index";
import {showAllTasks, updateCounter} from "./buttons";

export function addTask(e) {
    e.preventDefault();
    const task_str = this.newTaskText.value.trim();
    if (task_str.length !== 0) {
        const task = createTask(task_str);
        const li = createLi(task);
        todo_app_data.ul.appendChild(li);
        todo_app_data.tasks.push(task);
        todo_app_data.tasks_li.push(li);
        updateCounter();
        todo_app_data.all_button.checked = true;
        showAllTasks();
        this.reset();
    }
}

/**
 *
 * @param task{{id: string|number, text: string, isComplete: boolean}}
 * @returns {HTMLLIElement}
 */
function createLi(task) {
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

    itemList_task.append(input, label, span, button);
    li.appendChild(itemList_task);

    return li;
}

function createTask(str) {
    return {
        id: String(Date.now()),
        text: str,
        isComplete: false
    }
}

export function checkTask(id) {
    const task = todo_app_data.tasks.find(task => task.id === id);
    task.isComplete = !task.isComplete;
    updateCounter();
}

export function deleteTask(id) {
    const li = todo_app_data.tasks_li.find(task_li => task_li.id === id);
    todo_app_data.tasks_li = todo_app_data.tasks_li.filter(task_li => task_li.id !== id);
    todo_app_data.tasks = todo_app_data.tasks.filter(task => task.id !== id);
    li.remove();
    updateCounter();
}