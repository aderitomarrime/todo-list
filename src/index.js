import {Task} from "./task.js";
import {Project, projects, deleteProject, findProjectIndex} from "./project.js";
import {DomManipulation} from "./domManipulation.js";

projects.push(new Project("default", [new Task("Code", "Code everyday", "31/12/2026", "Hight", false)]));

projects[0].tasks.push(new Task("YouTube", "Make Videos", "31/12/2026", "Hight", false));

projects[0].tasks.push(new Task("YouTube", "Subscribe", "31/12/2026", "Hight", true));

// Project 2
projects.push(new Project("gym", [new Task("Push-ups", "Do it everyday", "31/12/2026", "Hight", false)]));

projects[1].tasks.push(new Task("Cardio", "30 min per day", "31/12/2026", "Medium", false));

projects[1].tasks.push(new Task("Arms", "30 min per week", "31/12/2026", "Medium", true));

const DomManipulationObject = new DomManipulation();
DomManipulationObject.createEssentials();
DomManipulationObject.createProjects(projects);
DomManipulationObject.listTasks(0,projects);

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
