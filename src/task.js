class Task {
    constructor(projectIndex, title, description, dueDate, priority, done){
        this.id = crypto.randomUUID();
        this.projectIndex = projectIndex;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;
    }
}

export {Task}