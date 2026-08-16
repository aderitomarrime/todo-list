import {Task} from "./task.js";
import {Project, projects, deleteProject} from "./project.js";

projects.push(new Project(0, "default", [new Task(0, "Code", "Code everyday", "31/12/2026", "Hight", false)]));

projects[0].tasks.push(new Task(1, "YouTube", "Make Videos", "31/12/2026", "Hight", false));

projects[0].tasks.push(new Task(2, "YouTube", "Subscribe", "31/12/2026", "Hight", false));

// Project 2
projects.push(new Project(1, "gym", [new Task(0, "Push-ups", "Do it everyday", "31/12/2026", "Hight", false)]));

projects[1].tasks.push(new Task(1, "Cardio", "30 min per day", "31/12/2026", "Medium", false));

projects[1].tasks.push(new Task(2, "Arms", "30 min per week", "31/12/2026", "Medium", false));

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
// projects[1].deleteTask(0);

//show
// console.log(projects[1].tasks[0]);

console.log(projects);
deleteProject(0);
console.log(projects);

