/* library */
import { observable, action } from 'mobx';

/* firebase */
import firebase from '../firebase.js';

class TodoListStore {
    @observable isFetching;
    @observable tasks;
    @observable todoListKey;

    constructor() {
        this.isFetching = false;
        this.tasks = null;
    }

    @action('fetch tasks from firebase')
    fetchTaskListByUserId(userId) {
        const taskListRef = firebase.database().ref('TodoList');
        const query = taskListRef.orderByChild('userId').equalTo(userId);

        query.once('value', (snap) => {
            if(snap.val() == null)
                taskListRef.push({
                    userId,
                })
                .then((snap) => {
                    this.todoListKey = snap.key;
                    this.tasks = [];
                    this.subscribeTodoListToValueChange(snap.key);
                });
            else {
                // Harcoded
                const todoListKey = Object.keys(snap.val())[0];
                this.todoListKey = todoListKey;
                this.subscribeTodoListToValueChange(todoListKey);
            }
        })
    }

    subscribeTodoListToValueChange (todoListKey) {
        const todoListRef = firebase.database().ref('TodoList').child(todoListKey);
        todoListRef.on('value', (snap) => {
            this.isFetching = true;
            if (snap.val()) {
                console.log('snapshot to current todolist', snap.val());
                let items = snap.val().Task;
                console.log('Tasks', items);
                let newTasks = [];
                for (let item in items) {
                newTasks.push({
                    id: item,
                    name: items[item].name,
                    amount: items[item].amount,
                    cost: items[item].cost,
                    isDone: items[item].isDone,
                });
                };

                this.tasks = newTasks;
            }
            this.isFetching = false;
        })
    }

    @action('add new task')
    addTask(newTask) {
        return new Promise((res, rej) => {
            const itemsRef = firebase.database().ref(`/TodoList/${this.todoListKey}/Task`);
            itemsRef.push(newTask, (err) => {
                if(err) rej(err);
                else res();
            });
        })
    }

    @action('remove tasks')
    removeAllTasks() {
        const itemsRef = firebase.database().ref('TodoList').child(this.todoListKey).child('Task');
        if (itemsRef)
            itemsRef.remove();
    }

    @action('update task done status')
    taskDone(taskId) {
        const itemRef = firebase.database().ref(`/TodoList/${this.todoListKey}/Task/${taskId}`);
        itemRef.update({
            isDone: true,
        });
    }
}

export default new TodoListStore();