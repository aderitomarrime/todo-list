import "./style.css";

import {Task} from "./task.js";
import {Project, projects, deleteProject, findProjectIndex} from "./project.js";
import {DomManipulation} from "./domManipulation.js";
import {getItemFromLocalStorage} from "./localStorage.js";

function createHtmlStruture(arrayOfProjects){
    const DomManipulationObject = new DomManipulation();
    const arrayIndex = 0;

    DomManipulationObject.createEssentials();
    DomManipulationObject.CreateButtonsToControlTheAside();
    DomManipulationObject.createAddNewProjectDialog(arrayOfProjects);
    DomManipulationObject.createButtonToAddProject();
    DomManipulationObject.createProjects(arrayOfProjects);
    DomManipulationObject.createButtonToAddTasks(arrayIndex, arrayOfProjects);
    DomManipulationObject.listTasks(arrayIndex, arrayOfProjects);
    DomManipulationObject.createInfoDialog();
    DomManipulationObject.createEditTaskInfoDialog(arrayIndex, arrayOfProjects);
    DomManipulationObject.createAddNewTaskDialog(arrayIndex, arrayOfProjects);
}

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

    createHtmlStruture(newArray);

}else{

    projects.push(new Project("default", [new Task("pushin 🅿️", "365 Days per year, 24 hours per day", new Date(2030,11,31), "Hight", false)]));

    createHtmlStruture(projects);

}


