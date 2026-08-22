class Project{
    constructor(name, tasks){
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = tasks;
    }

    deleteTask(taskIndex){
        this.tasks.splice(taskIndex, 1);
    }

    findTaskIndex(id){
        return this.tasks.findIndex(task => task.id == id);
    }
}

const projects = [];

function deleteProject(projectIndex) {
    projects.splice(projectIndex, 1);
}

function findProjectIndex(id) {
    return projects.findIndex(project => project.id == id)
}

export {Project, projects, deleteProject, findProjectIndex};