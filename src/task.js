class Task {
    constructor(taskIndex, title, description, dueDate, priority, done){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;
    }

    toggleDoneStatus(){
        this.done = !this.done;
    }

    update(title, description, dueDate, priority){
        if(title == undefined) {
            this.title = this.title;
        }else {
            this.title = title;
        }

        if(description == undefined) {
            this.description = this.description;
        }else {
            this.description = description;
        }

        if(dueDate == undefined) {
            this.dueDate = this.dueDate;
        }else {
            this.dueDate = dueDate;
        }

        if(priority == undefined) {
            this.priority = this.priority;
        }else {
            this.priority = priority;
        }
    }
}

export {Task}