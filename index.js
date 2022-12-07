import {addTask, deleteTask, checkTask} from "./task";
import {clearCompletedTasks, completeAllTasks, showActiveTasks, showAllTasks, showCompletedTasks} from "./buttons";

export const todo_app_data = {};
todo_app_data.ul = document.querySelector('.tasksList');
todo_app_data.tasks = [];
todo_app_data.tasks_li = [];
todo_app_data.all_button = document.getElementById('js-sallb');
todo_app_data.active_button = document.getElementById('js-sactiveb');
todo_app_data.complete_button = document.getElementById('js-scomplb');
todo_app_data.clear_complete_button = document.querySelector('.clearCompletedButton');
todo_app_data.complete_all_button = document.querySelector('.taskInput_selectAllButton');
todo_app_data.count_info = document.querySelector('.countInfo');
const form = document.querySelector('.taskInput_inputField');
const tasks_list = document.querySelector('.tasksList');


form.addEventListener('submit', addTask);
tasks_list.addEventListener('click', (e) => {
    if (e.target.className === 'task_DeleteButton') {
        deleteTask(e.target.closest('.itemList').id);
    }
    if (e.target.className === 'task_CheckButton') {
        checkTask(e.target.closest('.itemList').id);
    }
});

todo_app_data.all_button.addEventListener('click', showAllTasks);
todo_app_data.active_button.addEventListener('click', showActiveTasks);
todo_app_data.complete_button.addEventListener('click', showCompletedTasks);
todo_app_data.clear_complete_button.addEventListener('click', clearCompletedTasks);
todo_app_data.complete_all_button.addEventListener('click', completeAllTasks);