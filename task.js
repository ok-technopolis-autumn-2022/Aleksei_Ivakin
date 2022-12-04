import {todo_app_data} from "./index";
import {showAllTasks, updateCounter} from "./buttons";

export function addTask(e) {
    e.preventDefault();
    if (this.newTaskText.value.length !== 0) {
        const task = createTask(this.newTaskText.value);
        const li = createLi(task);
        todo_app_data.ul.appendChild(li);
        todo_app_data.tasks.push(task);
        todo_app_data.tasks_li.push(li);
        updateCounter();
        todo_app_data.all_button.click();
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
        todo_app_data.tasks_li =  todo_app_data.tasks_li.filter(task_li => task_li.id !== li.id);
        todo_app_data.tasks =  todo_app_data.tasks.filter(task => task.id !== Number(li.id));
        updateCounter();
        li.remove();
    }
    button.addEventListener('click', deleteTask);

    itemList_task.append(input, label, span, button);
    li.appendChild(itemList_task);

    return li;
}

function createTask(str) {
    return {
        id: Date.now(),
        text: str,
        isComplete: false
    }
}