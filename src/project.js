class Project{
    constructor(arrayIndex, nome, tasks){
        this.arrayIndex = arrayIndex;
        this.nome = nome;
        this.tasks = tasks;
    }

    deleteTask(taskIndex){
        this.tasks.splice(taskIndex, 1);
    }
}

const projects = [];

export {Project, projects};