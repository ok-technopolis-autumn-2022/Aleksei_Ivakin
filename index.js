const form = document.querySelector('.taskInput_inputField');
const ul = document.querySelector('.tasksList');

function addTask(e) {
    e.preventDefault();
    const task = createTask(this.newTaskText.value);
    ul.appendChild(createLi(task));
    this.reset();
}

/**
 *
 * @param task {{id: string|number, text: string}}
 * @returns {string}
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
    input.id = task.id + 1;
    input.title = "Выполнение задачи";

    const label = document.createElement('label');
    label.className = "task_Label";
    label.htmlFor = task.id + 1;
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
        li.remove();
    }
    button.addEventListener('click', deleteTask);

    itemList_task.append(input, label, span, button);
    li.appendChild(itemList_task);

    return li;

    //  <li id="${task.id}" class="itemList">
    //     <div class="itemList_task">
    //             <input class="task_CheckButton" type="checkbox" id="task" title="Выполнение задачи">
    //             <label class="task_Label" for=task" aria-label="Задача"></label>
    //             <span class="task_Text">${task.text}</span>
    //             <button class="task_DeleteButton" title="Удалить задачу">
    //                 <img src="images/cross.svg" alt="Cross">
    //             </button>
    //     </div>
    // </li>;
}

function createTask(str) {
    return {
        id: Date.now(),
        text: str
    }
}

form.addEventListener('submit', addTask);

