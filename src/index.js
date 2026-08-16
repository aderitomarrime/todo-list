import {Task} from "./task.js";
import {Project, projects} from "./project.js";

projects.push(new Project(0, "default", [new Task(0, "Code", "Code everyday", "31/12/2026", "Hight", false)]));

console.log(projects[0].tasks);
