import { findProjectIndex, projects} from "./project.js";
import {Task} from "./task.js"
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
        this.allTasks = document.createElement("div");
        this.myTitle = document.createElement("h1");
        this.projectsTitle = document.createElement("h2");
        this.projectList = document.createElement("ul");

        this.myTitle.textContent = "Todo-list";
        this.projectsTitle.textContent = "Projects";

        this.myHeader.classList.add("header");
        this.myAside.classList.add("aside");
        this.myMain.classList.add("main");
        this.allTasks.classList.add("all-tasks");

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
                document.querySelector("#newTaskModal").remove();
                this.createButtonToAddTasks(findProjectIndex(event.target.id), projects);
                this.listTasks(findProjectIndex(event.target.id), projects);
                this.createEditTaskInfoDialog(findProjectIndex(event.target.id), projects)
                this.createAddNewTaskDialog(findProjectIndex(event.target.id), projects)
            })
        })
    }

    listTasks(projectIndex, arrayOfProjects){
        this.myMain.appendChild(this.allTasks);
        this.allTasks.innerHTML = '';

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

            this.allTasks.appendChild(taskContainer);
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
        const editCancelButton = document.createElement("input");
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

        editCancelButton.setAttribute("type", "button");
        editCancelButton.setAttribute("value", "Cancel");
        editCancelButton.setAttribute("formmethod", "dialog");

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
        editForm.appendChild(editCancelButton);
        editForm.appendChild(editSubmitButton);

        editCancelButton.addEventListener("click", ()=>{
            this.editModal.close()
        })

        editForm.addEventListener("submit", (event)=>{
            const taskIndex = arrayOfProjects[projectIndex].findTaskIndex(editSubmitButton.id);

            this.updateTaskInfo(projectIndex, arrayOfProjects, taskIndex)

            event.preventDefault();
            this.editModal.close();
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

    createButtonToAddTasks(projectIndex, arrayOfProjects){
        this.myMain.innerHTML = '';
        const addButton =document.createElement("button");
        addButton.textContent = "New Task";
        addButton.setAttribute("data-id", `${arrayOfProjects[projectIndex].id}`);
        this.myMain.appendChild(addButton);

        addButton.addEventListener("click", ()=>{
            this.newTaskModal.showModal();
        })
    }

    createAddNewTaskDialog(projectIndex, arrayOfProjects){
        this.newTaskModal= document.createElement("dialog");
        const newTaskForm = document.createElement("form");
        const newTaskTitle = document.createElement("h1");
        const newTaskParagraph = document.createElement("p");
        const newTaskTitleLabel = document.createElement("label");
        const newTaskTitleinput = document.createElement("input");
        const newTaskDescriptionLabel = document.createElement("label");
        const newTaskDescriptioninput = document.createElement("input");
        const newTaskDueDateLabel = document.createElement("label");
        const newTaskDueDateinput = document.createElement("input");
        const newTaskPriorityLabel = document.createElement("label");
        const newTaskPrioritySelect = document.createElement("select");
        const newTaskPriorityoption1 = document.createElement("option");
        const newTaskPriorityoption2 = document.createElement("option");
        const newTaskPriorityoption3 = document.createElement("option");
        const newTaskTDoneLabel = document.createElement("label");
        const newTaskTDoneinput = document.createElement("input");
        const newTaskSubmitButton = document.createElement("input");
        const newTaskCancelButton = document.createElement("input");

        newTaskTitle.textContent = "New Task";
        newTaskParagraph.textContent = "Fill in the inputs with the task's details";
        newTaskTitleLabel.textContent = "Title";
        newTaskDescriptionLabel.textContent = "Description";
        newTaskDueDateLabel.textContent = "Due date";
        newTaskPriorityLabel.textContent = "Priority";
        newTaskPriorityoption1.textContent = "High";
        newTaskPriorityoption2.textContent = "Medium";
        newTaskPriorityoption3.textContent = "Low";
        newTaskTDoneLabel.textContent = "Is done?";

        this.newTaskModal.setAttribute("closedby", "any");
        this.newTaskModal.setAttribute("id", "newTaskModal");

        newTaskTitleLabel.setAttribute("for", "newtitle");
        newTaskTitleinput.setAttribute("type", "text");
        newTaskTitleinput.setAttribute("name", "newtitle");
        newTaskTitleinput.setAttribute("id", "newtitle");

        newTaskDescriptionLabel.setAttribute("for", "newdescription");
        newTaskDescriptioninput.setAttribute("type", "text");
        newTaskDescriptioninput.setAttribute("name", "newdescription");
        newTaskDescriptioninput.setAttribute("id", "newdescription");

        newTaskDueDateLabel.setAttribute("for", "newduedate");
        newTaskDueDateinput.setAttribute("type", "date");
        newTaskDueDateinput.setAttribute("name", "newduedate");
        newTaskDueDateinput.setAttribute("id", "newduedate");

        newTaskPriorityLabel.setAttribute("for", "newpriority");
        newTaskPrioritySelect.setAttribute("id", "newpriority");
        newTaskPrioritySelect.setAttribute("name", "newpriority");
        newTaskPriorityoption1.setAttribute("value", "High");
        newTaskPriorityoption2.setAttribute("value", "Medium");
        newTaskPriorityoption3.setAttribute("value", "Low");

        newTaskTDoneLabel.setAttribute("for", "newisdone");
        newTaskTDoneinput.setAttribute("type", "checkbox");
        newTaskTDoneinput.setAttribute("name", "newisdone");
        newTaskTDoneinput.setAttribute("id", "newisdone");

        // newTaskSubmitButton.setAttribute("id", `${arrayOfProjects[projectIndex].id}`);
        newTaskSubmitButton.setAttribute("type", "submit");
        newTaskSubmitButton.setAttribute("value", "Add Task");
        newTaskSubmitButton.setAttribute("name", "addTask");

        // newTaskSubmitButton.setAttribute("id", `${arrayOfProjects[projectIndex].id}`);
        newTaskCancelButton.setAttribute("type", "button");
        newTaskCancelButton.setAttribute("value", "Cancel");
        newTaskCancelButton.setAttribute("formmethod", "dialog");

        this.body.appendChild(this.newTaskModal);
        this.newTaskModal.appendChild(newTaskForm);
        newTaskForm.appendChild(newTaskTitle);
        newTaskForm.appendChild(newTaskParagraph);
        newTaskForm.appendChild(newTaskTitleLabel);
        newTaskForm.appendChild(newTaskTitleinput);
        newTaskForm.appendChild(newTaskDescriptionLabel);
        newTaskForm.appendChild(newTaskDescriptioninput);
        newTaskForm.appendChild(newTaskDueDateLabel);
        newTaskForm.appendChild(newTaskDueDateinput);
        newTaskForm.appendChild(newTaskPriorityLabel);
        newTaskForm.appendChild(newTaskPrioritySelect);
        newTaskPrioritySelect.appendChild(newTaskPriorityoption1);
        newTaskPrioritySelect.appendChild(newTaskPriorityoption2);
        newTaskPrioritySelect.appendChild(newTaskPriorityoption3);
        newTaskForm.appendChild(newTaskTDoneLabel);
        newTaskForm.appendChild(newTaskTDoneinput);
        newTaskForm.appendChild(newTaskCancelButton);
        newTaskForm.appendChild(newTaskSubmitButton);

        newTaskCancelButton.addEventListener("click", ()=>{
            this.newTaskModal.close();
        });

        newTaskForm.addEventListener("submit", (event)=>{
            
            this.addNewTask(projectIndex, arrayOfProjects);
        
            event.preventDefault();
            this.newTaskModal.close();
            newTaskForm.reset();
        })
    }

    addNewTask(projectIndex, arrayOfProjects){
        const newTitle = document.querySelector('input[name="newtitle"]').value;
        const newDescription = document.querySelector('input[name="newdescription"]').value;
        const newDueDate = document.querySelector('input[name="newduedate"]').value;
        const newPriority = document.querySelector('select[name="newpriority"]').value;
        const newIsDone = document.querySelector('input[name="newisdone"]').checked;

        const newTask = new Task(newTitle, newDescription, newDueDate, newPriority, newIsDone);

        arrayOfProjects[projectIndex].tasks.push(newTask);

        this.listTasks(projectIndex, arrayOfProjects);
    }

}

export {DomManipulation};