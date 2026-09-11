import { findProjectIndex, projects} from "./project.js";
import eyeSvg from "./svg/eye.svg";
import trashSvg from "./svg/trash.svg";
import pencilSvg from "./svg/pencil.svg";

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
                document.querySelector("#editModal").remove();
                this.listTasks(findProjectIndex(event.target.id), projects);
                this.createEditTaskInfoDialog(findProjectIndex(event.target.id), projects)
            })
        })
    }

    listTasks(projectIndex, arrayOfProjects){
        this.myMain.innerHTML = '';

        arrayOfProjects[projectIndex].tasks.forEach((task)=>{
            const taskContainer = document.createElement("div");
            const eye = document.createElement("img");
            const trash = document.createElement("img");
            const pencil = document.createElement("img");
            const title = document.createElement("h1");
            const description = document.createElement("p");
            const dueDate = document.createElement("p");
            const priority = document.createElement("p");
            const done = document.createElement("input");

            done.setAttribute("type", "checkbox");
            done.setAttribute("id", `${task.id}`);
            trash.setAttribute("id", `${task.id}`);
            pencil.setAttribute("id", `${task.id}`);

            title.textContent = task.title;
            description.textContent = task.description;
            dueDate.textContent = task.dueDate;
            priority.textContent = task.priority;
            eye.src = `${eyeSvg}`;
            trash.src = `${trashSvg}`;
            pencil.src = `${pencilSvg}`;

            if(task.done) {
                done.checked = true;
            }

            done.addEventListener("click", (event)=>{
                const taskIndex = arrayOfProjects[projectIndex].findTaskIndex(event.target.id);
                arrayOfProjects[projectIndex].tasks[taskIndex].toggleDoneStatus();
            })

            eye.addEventListener("click", ()=> {
                this.updateInfoDialog(task)
                this.infoModal.showModal();
            })

            trash.addEventListener("click", (event)=>{
                const taskIndex = arrayOfProjects[projectIndex].findTaskIndex(event.target.id);
                arrayOfProjects[projectIndex].deleteTask(taskIndex);
                taskContainer.remove();
            })

            pencil.addEventListener("click", (event)=> {
                this.editModal.showModal();
                const editSubmitButton = document.querySelector('#editModal input[name="update"]');
                editSubmitButton.setAttribute("id", `${task.id}`);
            })

            this.myMain.appendChild(taskContainer);
            taskContainer.appendChild(title);
            taskContainer.appendChild(description);
            taskContainer.appendChild(dueDate);
            taskContainer.appendChild(priority);
            taskContainer.appendChild(done);
            taskContainer.appendChild(eye);
            taskContainer.appendChild(pencil);
            taskContainer.appendChild(trash);
        })
    }

    createInfoDialog(){
        this.infoModal = document.createElement("dialog");
        const closeInfoModal = document.createElement("button");

        const titleModal = document.createElement("h1");
        const descriptionModal = document.createElement("p");
        const dueDateModal = document.createElement("p");
        const priorityModal = document.createElement("p");
        const doneModal = document.createElement("p");

        closeInfoModal.textContent = "X"

        this.infoModal.setAttribute("closedby", "any");
        this.infoModal.setAttribute("id", "infoModal");

        this.body.appendChild(this.infoModal);
        this.infoModal.appendChild(titleModal);
        this.infoModal.appendChild(descriptionModal);
        this.infoModal.appendChild(dueDateModal);
        this.infoModal.appendChild(priorityModal);
        this.infoModal.appendChild(doneModal);
        this.infoModal.appendChild(closeInfoModal);

        closeInfoModal.addEventListener("click", ()=>{
            this.infoModal.close();
        })
    }

    updateInfoDialog(task){

        const titleModal = document.querySelector("#infoModal h1");
        const descriptionModal = document.querySelector("#infoModal p:nth-of-type(1)");
        const dueDateModal = document.querySelector("#infoModal p:nth-of-type(2)");
        const priorityModal = document.querySelector("#infoModal p:nth-of-type(3)");
        const doneModal = document.querySelector("#infoModal p:nth-of-type(4)");

        titleModal.textContent =  `${task.title}`;
        descriptionModal.textContent =  `Description: ${task.description}`;
        dueDateModal.textContent = `Due Date: ${task.dueDate}`;
        priorityModal.textContent = `Priority: ${task.priority}`;
        doneModal.textContent = "Done: "+ `${task.done ? "Yes": "No"}`;
    
    }

    createEditTaskInfoDialog(projectIndex, arrayOfProjects){
        this.editModal= document.createElement("dialog");
        const editForm = document.createElement("form");
        const editTitle = document.createElement("h1");
        const editParagraph = document.createElement("p");
        const editTitleLabel = document.createElement("label");
        const editTitleinput = document.createElement("input");
        const editDescriptionLabel = document.createElement("label");
        const editDescriptioninput = document.createElement("input");
        const editDueDateLabel = document.createElement("label");
        const editDueDateinput = document.createElement("input");
        const editPriorityLabel = document.createElement("label");
        const editPrioritySelect = document.createElement("select");
        const editPriorityoption0 = document.createElement("option");
        const editPriorityoption1 = document.createElement("option");
        const editPriorityoption2 = document.createElement("option");
        const editPriorityoption3 = document.createElement("option");
        const editSubmitButton = document.createElement("input");

        editTitle.textContent = "Update Details";
        editParagraph.textContent = "Blank fields will not be updated";
        editTitleLabel.textContent = "Title";
        editDescriptionLabel.textContent = "Description";
        editDueDateLabel.textContent = "Due date";
        editPriorityLabel.textContent = "Priority";
        editPriorityoption0.textContent = "--Select Priority--";
        editPriorityoption1.textContent = "High";
        editPriorityoption2.textContent = "Medium";
        editPriorityoption3.textContent = "Low";

        this.editModal.setAttribute("closedby", "any");
        this.editModal.setAttribute("id", "editModal");

        editTitleLabel.setAttribute("for", "title");
        editTitleinput.setAttribute("type", "text");
        editTitleinput.setAttribute("name", "title");
        editTitleinput.setAttribute("id", "title");

        editDescriptionLabel.setAttribute("for", "description");
        editDescriptioninput.setAttribute("type", "text");
        editDescriptioninput.setAttribute("name", "description");
        editDescriptioninput.setAttribute("id", "description");

        editDueDateLabel.setAttribute("for", "duedate");
        editDueDateinput.setAttribute("type", "date");
        editDueDateinput.setAttribute("name", "duedate");
        editDueDateinput.setAttribute("id", "duedate");

        editPriorityLabel.setAttribute("for", "priority");
        editPrioritySelect.setAttribute("id", "priority");
        editPrioritySelect.setAttribute("name", "priority");
        editPriorityoption0.setAttribute("value", "");
        editPriorityoption1.setAttribute("value", "High");
        editPriorityoption2.setAttribute("value", "Medium");
        editPriorityoption3.setAttribute("value", "Low");

        // editSubmitButton.setAttribute("id", `${arrayOfProjects[projectIndex].id}`);
        editSubmitButton.setAttribute("type", "submit");
        editSubmitButton.setAttribute("value", "Update");
        editSubmitButton.setAttribute("name", "update");

        this.body.appendChild(this.editModal);
        this.editModal.appendChild(editForm);
        editForm.appendChild(editTitle);
        editForm.appendChild(editParagraph);
        editForm.appendChild(editTitleLabel);
        editForm.appendChild(editTitleinput);
        editForm.appendChild(editDescriptionLabel);
        editForm.appendChild(editDescriptioninput);
        editForm.appendChild(editDueDateLabel);
        editForm.appendChild(editDueDateinput);
        editForm.appendChild(editPriorityLabel);
        editForm.appendChild(editPrioritySelect);
        editPrioritySelect.appendChild(editPriorityoption0);
        editPrioritySelect.appendChild(editPriorityoption1);
        editPrioritySelect.appendChild(editPriorityoption2);
        editPrioritySelect.appendChild(editPriorityoption3);
        editForm.appendChild(editSubmitButton);

        editForm.addEventListener("submit", (event)=>{
            const taskIndex = arrayOfProjects[projectIndex].findTaskIndex(editSubmitButton.id);

            this.updateTaskInfo(projectIndex, arrayOfProjects, taskIndex)

            event.preventDefault();
            editForm.reset();
        })
    }

    updateTaskInfo(projectIndex, arrayOfProjects, taskIndex){
            const newTitle = document.querySelector('input[name="title"]').value;
            const newDescription = document.querySelector('input[name="description"]').value;
            const newDueDate = document.querySelector('input[name="duedate"]').value;
            const newPriority = document.querySelector('select[name="priority"]').value;

            arrayOfProjects[projectIndex].tasks[taskIndex].update(newTitle, newDescription, newDueDate, newPriority);
            
            this.listTasks(projectIndex, arrayOfProjects);
    }

}

export {DomManipulation};