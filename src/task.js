class Task {
    constructor(taskIndex, title, description, dueDate, priority, done){
        this.id = crypto.randomUUID();
        this.taskIndex = taskIndex;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;
    }

    toggleDoneStatus(){
        this.done = !this.done;
    }
}

export {Task}