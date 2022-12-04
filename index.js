import {addTask} from "./task";
import {clearCompletedTasks, completeAllTasks, showActiveTasks, showAllTasks, showCompletedTasks} from "./buttons";

export const todo_app_data = {};
todo_app_data.ul = document.querySelector('.tasksList');
todo_app_data.tasks = [];
todo_app_data.tasks_li = [];
todo_app_data.all_button = document.getElementById('sallb');
todo_app_data.active_button = document.getElementById('sactiveb');
todo_app_data.complete_button = document.getElementById('scomplb');
todo_app_data.clear_complete_button = document.querySelector('.clearCompletedButton');
todo_app_data.complete_all_button = document.querySelector('.taskInput_selectAllButton');
todo_app_data.count_info = document.querySelector('.countInfo');
const form = document.querySelector('.taskInput_inputField');

form.addEventListener('submit', addTask);
todo_app_data.all_button.addEventListener('focus', showAllTasks);
todo_app_data.active_button.addEventListener('focus', showActiveTasks);
todo_app_data.complete_button.addEventListener('focus', showCompletedTasks);
todo_app_data.clear_complete_button.addEventListener('focus', clearCompletedTasks);
todo_app_data.complete_all_button.addEventListener('focus', completeAllTasks);