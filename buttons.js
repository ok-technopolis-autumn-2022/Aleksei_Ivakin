import {todo_app_data} from './index'
import {deleteTask} from "./task";

export function updateCounter() {
    todo_app_data.count_info.innerHTML = String(todo_app_data.tasks.filter(task => !task.isComplete).length + " items left")
}

export function showAllTasks() {
    todo_app_data.tasks_li.forEach(li => todo_app_data.ul.appendChild(li));
}

export function showActiveTasks() {
    clearTaskBoard();
    const active_tasks = todo_app_data.tasks.filter(task => !task.isComplete);
    active_tasks.forEach(task => todo_app_data.ul.appendChild(todo_app_data.tasks_li.find(li => li.id === task.id)));
}

export function showCompletedTasks() {
    clearTaskBoard();
    const unactive_tasks = todo_app_data.tasks.filter(task => task.isComplete);
    unactive_tasks.forEach(task => todo_app_data.ul.appendChild(todo_app_data.tasks_li.find(li => li.id === task.id)));
}

export function clearCompletedTasks() {
    const unactive_tasks = todo_app_data.tasks.filter(task => task.isComplete);
    unactive_tasks.forEach(task => deleteTask(task.id));
}

export function completeAllTasks(e) {
    e.preventDefault();
    const unactive_tasks = todo_app_data.tasks.filter(task => !task.isComplete);
    unactive_tasks.forEach(task => {
        todo_app_data.tasks_li.find(li => li.id === task.id).querySelector('.itemList_task')
            .querySelector('.task_CheckButton').checked = true;
        task.isComplete = true;
    });
    updateCounter();
}

function clearTaskBoard() {
    todo_app_data.tasks_li.forEach(li => li.remove());
}

