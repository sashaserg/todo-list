/* library */
import { observable, action } from 'mobx';

/* firebase */
import firebase from '../firebase.js';

class TodoListStore {
    @observable isFetching;
    @observable tasks;

    constructor() {
        this.isFetching = false;
        this.tasks = null;
    }

    @action('fetch tasks from firebase')
    fetchTasks() {
        const itemsRef = firebase.database().ref('TodoList').child('Task');
        itemsRef.on('value', (snapshot) => {
            let tasks = snapshot.val();
            let newTasks = [];
            for (let task in tasks) {
                newTasks.push({
                id: task,
                name: tasks[task].name,
                isDone: tasks[task].isDone,
                });
            }
            this.tasks = newTasks;
        });
    }

    @action('add new task')
    addTask(newTask) {
        return new Promise((res, rej) => {
            const itemsRef = firebase.database().ref('TodoList').child('Task');
            itemsRef.push(newTask, (err) => {
                if(err) rej(err);
                else res();
            });
        })
    }

    @action('remove tasks')
    removeAllTasks() {
        const itemsRef = firebase.database().ref('TodoList').child('Task');
        if (itemsRef)
        itemsRef.remove();
    }

    @action('update task done status')
    taskDone(taskId) {
        const itemRef = firebase.database().ref(`/TodoList/Task/${taskId}`);
        itemRef.update({
            isDone: true,
        });
    }
}

export default new TodoListStore();