class Project{
    constructor(arrayIndex, nome, tasks){
        this.id = crypto.randomUUID();
        this.arrayIndex = arrayIndex;
        this.nome = nome;
        this.tasks = tasks;
    }

    deleteTask(taskIndex){
        this.tasks.splice(taskIndex, 1);
    }
}

const projects = [];

function deleteProject(projectIndex) {
    projects.splice(projectIndex, 1);
}

export {Project, projects, deleteProject};