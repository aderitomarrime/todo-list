import {Task} from "./task.js";
import {Project, projects, deleteProject, findProjectIndex} from "./project.js";
import {DomManipulation} from "./domManipulation.js";
import {getItemFromLocalStorage} from "./localStorage.js";

let arrayOfProjects;
const DomManipulationObject = new DomManipulation();

if(localStorage.getItem("arrayOfProjects")) {
    let arrayOfProjectsFromLocalStorage = getItemFromLocalStorage();
    let newArray = [];
    let indexCount = 0;
    for(let item of arrayOfProjectsFromLocalStorage) {
        newArray.push(new Project(item.name, []))
        for(let task of item.tasks){

            let newDueDateObject;
            if(task.dueDate != "") {
                newDueDateObject = new Date(task.dueDate);
            }else {
                newDueDateObject = task.dueDate;
            }

            newArray[indexCount].tasks.push(new Task(task.title, task.description, newDueDateObject, task.priority, task.done));
        }
        indexCount++;
    }

    arrayOfProjects = newArray;

}else{

    projects.push(new Project("default", [new Task("pushin 🅿️", "365 Days per year, 24 hours per day", new Date(2030,11,31), "Hight", false)]));

    arrayOfProjects = projects;

}

DomManipulationObject.createEssentials();
DomManipulationObject.createAddNewProjectDialog(arrayOfProjects);
DomManipulationObject.createButtonToAddProject();
DomManipulationObject.createProjects(arrayOfProjects);
DomManipulationObject.createButtonToAddTasks(0,arrayOfProjects);
DomManipulationObject.listTasks(0,arrayOfProjects);
DomManipulationObject.createInfoDialog();
DomManipulationObject.createEditTaskInfoDialog(0, arrayOfProjects);
DomManipulationObject.createAddNewTaskDialog(0, arrayOfProjects);


//show 
// console.log(projects);
// console.log(projects[0].tasks);
// console.log(projects[1].tasks);

// change done status
// projects[1].tasks[0].toggleDoneStatus();
// projects[1].tasks[1].toggleDoneStatus();
// projects[1].tasks[2].toggleDoneStatus();

//show
// console.log(projects[1].tasks[0]);

//update task
// let title, description, dueDate, priority;
// title = "Subscribe now";
// description = "It helps a lot";
// console.log(title);
// projects[1].tasks[0].update(title,description, dueDate, priority);

//show
// console.log(projects[1].tasks[0]);

//delete task
// console.log(projects[1].tasks);
// projects[1].deleteTask(projects[1].findTaskIndex(projects[1].tasks[0].id));
// console.log(projects[1].tasks);

//show
// console.log(projects[1].tasks[0]);

// console.log(projects);
// deleteProject(findProjectIndex(projects[1].id));
// console.log(projects);


// console.log(projects[0].tasks);
// let id = projects[0].tasks[1].id;
// console.log(projects[0].tasks[0].id);


// let id = projects[1].id;
// console.log(findProjectIndex(id));

// let id = projects[1].id;
// console.log(findProjectIndex(id));
// console.log(projects[1].arrayIndex);

// console.log(projects[1].tasks);
// console.log(projects[1]);
