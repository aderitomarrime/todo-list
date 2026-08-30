import { findProjectIndex, projects} from "./project.js";
import eyeSvg from "./svg/eye.svg";
import trashSvg from "./svg/trash.svg";

class DomManipulation{

    body = document.querySelector("body");
    myHeader;
    myAside;
    myMain;
    myTitle;
    projectsTitle;
    projectList;

    createEssentials(){
        this.myHeader = document.createElement("div");
        this.myAside = document.createElement("div");
        this.myMain = document.createElement("div");
        this.myTitle = document.createElement("h1");
        this.projectsTitle = document.createElement("h2");
        this.projectList = document.createElement("ul");

        this.myTitle.textContent = "Todo-list";
        this.projectsTitle.textContent = "Projects";

        this.myHeader.classList.add("header");
        this.myAside.classList.add("aside");
        this.myMain.classList.add("main");

        this.body.appendChild(this.myHeader);
        this.body.appendChild(this.myAside);
        this.body.appendChild(this.myMain);
        this.myHeader.appendChild(this.myTitle);
        this.myAside.appendChild(this.projectsTitle);
        this.myAside.appendChild(this.projectList);
    }

    createProjects(arrayOfProjects){
        // learn about "perda de contexto"
        arrayOfProjects.forEach((project)=>{
            const myProject = document.createElement("li");
            myProject.textContent = project.name;
            myProject.setAttribute("id", `${project.id}`);
            this.projectList.appendChild(myProject);
            
            myProject.addEventListener('click', (event)=> {
                this.listTasks(findProjectIndex(event.target.id), projects);
            })
        })
    }

    listTasks(projectIndex, arrayOfProjects){
        this.myMain.innerHTML = '';
        arrayOfProjects[projectIndex].tasks.forEach((task)=>{
            const taskContainer = document.createElement("div");
            const eye = document.createElement("img");
            const trash = document.createElement("img");
            const title = document.createElement("h1");
            const description = document.createElement("p");
            const dueDate = document.createElement("p");
            const priority = document.createElement("p");
            const done = document.createElement("input");

            done.setAttribute("type", "checkbox");
            done.setAttribute("id", `${task.id}`);
            trash.setAttribute("id", `${task.id}`);

            title.textContent = task.title;
            description.textContent = task.description;
            dueDate.textContent = task.dueDate;
            priority.textContent = task.priority;
            eye.src = `${eyeSvg}`;
            trash.src = `${trashSvg}`;

            if(task.done) {
                done.checked = true;
            }

            done.addEventListener("click", (event)=>{
                const taskIndex = arrayOfProjects[projectIndex].findTaskIndex(event.target.id);
                arrayOfProjects[projectIndex].tasks[taskIndex].toggleDoneStatus();
            })

            eye.addEventListener("click", ()=> {
                const infoModal = document.createElement("dialog");
                const closeInfoModal = document.createElement("button");

                const titleModal = title.cloneNode(true);
                const descriptionModal = description.cloneNode(true);
                const dueDateModal = dueDate.cloneNode(true);
                const priorityModal = priority.cloneNode(true);
                const doneModal = document.createElement("p");

                doneModal.textContent = "Done: "+ `${task.done ? "Yes": "No"}`;
                descriptionModal.textContent =  `Description: ${task.description}`;
                dueDateModal.textContent = `Due Date: ${task.dueDate}`;
                priorityModal.textContent = `Priority: ${task.priority}`;

                closeInfoModal.textContent = "X"

                infoModal.setAttribute("closedby", "any");
                infoModal.setAttribute("id", "infoModal");

                this.body.appendChild(infoModal);
                infoModal.appendChild(titleModal);
                infoModal.appendChild(descriptionModal);
                infoModal.appendChild(dueDateModal);
                infoModal.appendChild(priorityModal);
                infoModal.appendChild(doneModal);
                infoModal.appendChild(closeInfoModal);
                infoModal.showModal();

                closeInfoModal.addEventListener("click", ()=>{
                    infoModal.close();
                })
            })

            trash.addEventListener("click", (event)=>{
                const taskIndex = arrayOfProjects[projectIndex].findTaskIndex(event.target.id);
                arrayOfProjects[projectIndex].deleteTask(taskIndex);
                taskContainer.remove();
            })

            this.myMain.appendChild(taskContainer);
            taskContainer.appendChild(title);
            taskContainer.appendChild(description);
            taskContainer.appendChild(dueDate);
            taskContainer.appendChild(priority);
            taskContainer.appendChild(done);
            taskContainer.appendChild(eye);
            taskContainer.appendChild(trash);
        })
    }

}

export {DomManipulation};