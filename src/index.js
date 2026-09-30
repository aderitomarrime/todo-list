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
