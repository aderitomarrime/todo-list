import {format} from "date-fns";
import {findProjectIndex, projects, Project, deleteProject} from "./project.js";
import {Task} from "./task.js"
import {addArrayToLocalStorage, getItemFromLocalStorage } from "./localStorage.js";
import eyeSvg from "./svg/eye.svg";
import trashSvg from "./svg/trash.svg";
import pencilSvg from "./svg/pencil.svg";
import calendarSvg from "./svg/calendar.svg";
import list from "./svg/list.svg";
import xLg from "./svg/x-lg.svg";

class DomManipulation{

    body = document.querySelector("body");
    myHeader;
    myAside;
    myMain;
    myTitle;
    projectsTitle;
    projectList;
    todoTitle;

    createEssentials(){
        this.myHeader = document.createElement("div");
        this.myAside = document.createElement("div");
        this.myMain = document.createElement("div");
        this.mainHeader = document.createElement("div");
        this.todoTitle = document.createElement("div");
        this.calendar = document.createElement("img");
        this.todoText = document.createElement("h2");
        this.buttonContainer = document.createElement("div");
        this.allTasks = document.createElement("div");
        this.myTitle = document.createElement("h1");
        this.projectsTitle = document.createElement("h2");
        this.projectList = document.createElement("ul");

        this.myTitle.textContent = "Todo-List";
        this.projectsTitle.textContent = "Projects";
        this.todoText.textContent = "To-Do"

        this.myHeader.classList.add("header");
        this.myAside.classList.add("aside");
        this.myMain.classList.add("main");
        this.mainHeader.classList.add("main-header");
        this.todoTitle.classList.add("todo-title");
        this.buttonContainer.classList.add("button-container");
        this.allTasks.classList.add("all-tasks");

        this.calendar.setAttribute("src", `${calendarSvg}`);

        this.body.appendChild(this.myHeader);
        this.body.appendChild(this.myAside);
        this.body.appendChild(this.myMain);
        this.myHeader.appendChild(this.myTitle);
        this.myAside.appendChild(this.projectsTitle);
        this.myAside.appendChild(this.projectList);
        this.myMain.appendChild(this.mainHeader);
        this.mainHeader.appendChild(this.todoTitle);
        this.mainHeader.appendChild(this.buttonContainer);
        this.todoTitle.appendChild(this.calendar);
        this.todoTitle.appendChild(this.todoText);
    }

    createProjects(arrayOfProjects){
        // learn about "perda de contexto"

        this.projectList.innerHTML = '';
        arrayOfProjects.forEach((project)=>{
            const myProject = document.createElement("li");
            const mySpan = document.createElement("span");
            const divIcon = document.createElement("div");
            const projectTrash = document.createElement("img");

            const currentProjectIndex = findProjectIndex(arrayOfProjects, project.id)
            
            mySpan.textContent = project.name;
            mySpan.setAttribute("id", `${project.id}`);
            projectTrash.setAttribute("id", `${project.id}`);
            projectTrash.setAttribute("src", `${trashSvg}`);

            divIcon.append(projectTrash);
            myProject.appendChild(mySpan);
            myProject.appendChild(divIcon);
            this.projectList.appendChild(myProject);
            
            mySpan.addEventListener('click', (event)=> {
                document.querySelector("#editModal").remove();
                document.querySelector("#newTaskModal").remove();
                
                const projectIndex = findProjectIndex(arrayOfProjects, event.target.id)

                this.createButtonToAddTasks(projectIndex, arrayOfProjects);
                this.listTasks(projectIndex, arrayOfProjects);
                this.createEditTaskInfoDialog(projectIndex, arrayOfProjects)
                this.createAddNewTaskDialog(projectIndex, arrayOfProjects)
            })

            projectTrash.addEventListener("click", (event)=>{
                const projectIndex = findProjectIndex(arrayOfProjects, event.target.id)
                deleteProject(arrayOfProjects, projectIndex);
                addArrayToLocalStorage(arrayOfProjects);

                if(arrayOfProjects.length > 0) {
                    if(currentProjectIndex == projectIndex) {
                        this.createProjects(arrayOfProjects);
                        this.listTasks(0, arrayOfProjects);
                    }
                }else{
                    this.allTasks.innerHTML = '';
                }
                myProject.remove();
            })
        })
    }

    listTasks(projectIndex, arrayOfProjects){
        this.allTasks.innerHTML = '';
        this.myMain.appendChild(this.allTasks);

        arrayOfProjects[projectIndex].tasks.forEach((task)=>{
            
            const taskContainer = document.createElement("div");
            const checkContainer = document.createElement("div");
            const titleContainer = document.createElement("div");
            const iconsContainer = document.createElement("div");
            const eye = document.createElement("img");
            const trash = document.createElement("img");
            const pencil = document.createElement("img");
            const title = document.createElement("h1");
            const description = document.createElement("p");
            const dueDate = document.createElement("p");
            const priority = document.createElement("p");
            const done = document.createElement("input");

            let dueDateFormated;

            done.setAttribute("type", "checkbox");
            
            done.setAttribute("id", `${task.id}`);
            trash.setAttribute("id", `${task.id}`);
            pencil.setAttribute("id", `${task.id}`);

            checkContainer.setAttribute("class", "check-container");
            titleContainer.setAttribute("class", "title-container");
            iconsContainer.setAttribute("class", "icons-container");

            title.textContent = task.title;
            description.textContent = task.description;

            if(task.dueDate != "") {
                dueDateFormated = format(task.dueDate, 'dd MMMM yyyy');
            }else {
                dueDateFormated = task.dueDate;
            }
            
            dueDate.textContent = `Due date: ${dueDateFormated}`;

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
                addArrayToLocalStorage(arrayOfProjects);
            })

            eye.addEventListener("click", ()=> {
                this.updateInfoDialog(task)
                this.infoModal.showModal();
            })

            trash.addEventListener("click", (event)=>{
                const taskIndex = arrayOfProjects[projectIndex].findTaskIndex(event.target.id);
                arrayOfProjects[projectIndex].deleteTask(taskIndex);
                addArrayToLocalStorage(arrayOfProjects);
                taskContainer.remove();
            })

            pencil.addEventListener("click", (event)=> {
                this.editModal.showModal();
                const editSubmitButton = document.querySelector('#editModal input[name="update"]');
                editSubmitButton.setAttribute("id", `${task.id}`);
            })

            this.allTasks.appendChild(taskContainer);
            taskContainer.appendChild(checkContainer);
            taskContainer.appendChild(titleContainer);
            taskContainer.appendChild(iconsContainer);

            checkContainer.appendChild(done);
            titleContainer.appendChild(title);

            if(task.dueDate != "") {
                titleContainer.appendChild(dueDate);
            }

            iconsContainer.appendChild(eye);
            iconsContainer.appendChild(pencil);
            iconsContainer.appendChild(trash);
        })
    }

    createInfoDialog(){
        this.infoModal = document.createElement("dialog");
        const closeInfoModal = document.createElement("button");

        const topContainer = document.createElement("div");
        const bottomContainer = document.createElement("div");

        const titleModal = document.createElement("h1");
        const descriptionModal = document.createElement("p");
        const dueDateModal = document.createElement("p");
        const priorityModal = document.createElement("p");
        const doneModal = document.createElement("p");

        closeInfoModal.textContent = "X"

        this.infoModal.setAttribute("closedby", "any");
        this.infoModal.setAttribute("id", "infoModal");

        topContainer.classList.add("top");
        bottomContainer.classList.add("bottom");

        this.body.appendChild(this.infoModal);
        this.infoModal.appendChild(topContainer);
        this.infoModal.appendChild(bottomContainer);
        topContainer.appendChild(titleModal);
        topContainer.appendChild(descriptionModal);
        bottomContainer.appendChild(dueDateModal);
        bottomContainer.appendChild(priorityModal);
        bottomContainer.appendChild(doneModal);
        this.infoModal.appendChild(closeInfoModal);

        closeInfoModal.addEventListener("click", ()=>{
            this.infoModal.close();
        })
    }

    updateInfoDialog(task){

        const titleModal = document.querySelector("#infoModal .top h1");
        const descriptionModal = document.querySelector("#infoModal .top p");
        const dueDateModal = document.querySelector("#infoModal .bottom p:nth-of-type(1)");
        const priorityModal = document.querySelector("#infoModal .bottom p:nth-of-type(2)");
        const doneModal = document.querySelector("#infoModal .bottom p:nth-of-type(3)");

        if(task.title != ""){
            titleModal.textContent =  `${task.title}`;
        }else{
            titleModal.textContent =  ``;
        }
        if(task.description != ""){
            descriptionModal.textContent =  `${task.description}`;
        }else{
            descriptionModal.textContent =  ``;
        }
        if(task.dueDate != ""){
            const dueDateFormated = format(task.dueDate, 'dd MMMM yyyy');
            dueDateModal.textContent = `Due date: ${dueDateFormated}`;
        }else{
            dueDateModal.textContent = ``;
        }
        if(task.priority != ""){
            priorityModal.textContent = `Priority: ${task.priority}`;
        }else{
            priorityModal.textContent = ``;
        }
        doneModal.textContent = "Status: "+ `${task.done ? "Done": "Not done"}`;
        
    }

    createEditTaskInfoDialog(projectIndex, arrayOfProjects){
        this.editModal= document.createElement("dialog");
        const editForm = document.createElement("form");
        const editTaskTitleConatiner = document.createElement("div");
        const editTaskControllersConatiner = document.createElement("div");
        const editTaskButtonConatiner = document.createElement("div");
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

        editTaskTitleConatiner.setAttribute("class", "title");
        editTaskControllersConatiner.setAttribute("class", "controller");
        editTaskButtonConatiner.setAttribute("class", "button");

        editTitleLabel.setAttribute("for", "title");
        editTitleinput.setAttribute("type", "text");
        editTitleinput.setAttribute("name", "title");
        editTitleinput.setAttribute("id", "title");
        editTitleinput.setAttribute("minlength", "3");
        editTitleinput.setAttribute("maxlength", "30");

        editDescriptionLabel.setAttribute("for", "description");
        editDescriptioninput.setAttribute("type", "text");
        editDescriptioninput.setAttribute("name", "description");
        editDescriptioninput.setAttribute("id", "description");
        editDescriptioninput.setAttribute("minlength", "3");
        editDescriptioninput.setAttribute("maxlength", "150");

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
        editForm.appendChild(editTaskTitleConatiner);
        editForm.appendChild(editTaskControllersConatiner);
        editTaskTitleConatiner.appendChild(editTitle);
        editTaskTitleConatiner.appendChild(editParagraph);
        editTaskControllersConatiner.appendChild(editTitleLabel);
        editTaskControllersConatiner.appendChild(editTitleinput);
        editTaskControllersConatiner.appendChild(editDescriptionLabel);
        editTaskControllersConatiner.appendChild(editDescriptioninput);
        editTaskControllersConatiner.appendChild(editDueDateLabel);
        editTaskControllersConatiner.appendChild(editDueDateinput);
        editTaskControllersConatiner.appendChild(editPriorityLabel);
        editTaskControllersConatiner.appendChild(editPrioritySelect);
        editPrioritySelect.appendChild(editPriorityoption0);
        editPrioritySelect.appendChild(editPriorityoption1);
        editPrioritySelect.appendChild(editPriorityoption2);
        editPrioritySelect.appendChild(editPriorityoption3);
        editForm.appendChild(editTaskButtonConatiner);
        editTaskButtonConatiner.appendChild(editCancelButton);
        editTaskButtonConatiner.appendChild(editSubmitButton);

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

            let newDueDateObject;

            if(newDueDate != "") {
                const [year, month, day] = newDueDate.split("-");
                newDueDateObject = new Date(year, month -1, day);
            }else {
                newDueDateObject = newDueDate;
            }
            
            arrayOfProjects[projectIndex].tasks[taskIndex].update(newTitle, newDescription, newDueDateObject, newPriority);
            addArrayToLocalStorage(arrayOfProjects);

            this.listTasks(projectIndex, arrayOfProjects);
    }

    createButtonToAddTasks(projectIndex, arrayOfProjects){
        this.buttonContainer.innerHTML = '';

        const addButton =document.createElement("button");
        addButton.textContent = "New Task";
        addButton.setAttribute("data-id", `${arrayOfProjects[projectIndex].id}`);
        this.buttonContainer.appendChild(addButton);

        addButton.addEventListener("click", ()=>{
            this.newTaskModal.showModal();
        })
    }

    createAddNewTaskDialog(projectIndex, arrayOfProjects){
        this.newTaskModal= document.createElement("dialog");
        const newTaskForm = document.createElement("form");
        const newTaskTitleConatiner = document.createElement("div");
        const newTaskControllersConatiner = document.createElement("div");
        const newTaskButtonConatiner = document.createElement("div");
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

        newTaskTitleConatiner.setAttribute("class", "title");
        newTaskControllersConatiner.setAttribute("class", "controller");
        newTaskButtonConatiner.setAttribute("class", "button");

        newTaskTitleLabel.setAttribute("for", "newtitle");
        newTaskTitleinput.setAttribute("type", "text");
        newTaskTitleinput.setAttribute("name", "newtitle");
        newTaskTitleinput.setAttribute("id", "newtitle");
        newTaskTitleinput.setAttribute("required", "true");
        newTaskTitleinput.setAttribute("minlength", "3");
        newTaskTitleinput.setAttribute("maxlength", "30");

        newTaskDescriptionLabel.setAttribute("for", "newdescription");
        newTaskDescriptioninput.setAttribute("type", "text");
        newTaskDescriptioninput.setAttribute("name", "newdescription");
        newTaskDescriptioninput.setAttribute("id", "newdescription");
        newTaskDescriptioninput.setAttribute("minlength", "3");
        newTaskDescriptioninput.setAttribute("maxlength", "150");

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
        newTaskForm.appendChild(newTaskTitleConatiner);
        newTaskForm.appendChild(newTaskControllersConatiner);
        newTaskTitleConatiner.appendChild(newTaskTitle);
        newTaskTitleConatiner.appendChild(newTaskParagraph);
        newTaskControllersConatiner.appendChild(newTaskTitleLabel);
        newTaskControllersConatiner.appendChild(newTaskTitleinput);
        newTaskControllersConatiner.appendChild(newTaskDescriptionLabel);
        newTaskControllersConatiner.appendChild(newTaskDescriptioninput);
        newTaskControllersConatiner.appendChild(newTaskDueDateLabel);
        newTaskControllersConatiner.appendChild(newTaskDueDateinput);
        newTaskControllersConatiner.appendChild(newTaskPriorityLabel);
        newTaskControllersConatiner.appendChild(newTaskPrioritySelect);
        newTaskPrioritySelect.appendChild(newTaskPriorityoption1);
        newTaskPrioritySelect.appendChild(newTaskPriorityoption2);
        newTaskPrioritySelect.appendChild(newTaskPriorityoption3);
        newTaskControllersConatiner.appendChild(newTaskTDoneLabel);
        newTaskControllersConatiner.appendChild(newTaskTDoneinput);
        newTaskControllersConatiner.appendChild(newTaskButtonConatiner);
        newTaskButtonConatiner.appendChild(newTaskCancelButton);
        newTaskButtonConatiner.appendChild(newTaskSubmitButton);

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

        let newDueDateObject;

        if(newDueDate != "") {
            const [year, month, day] = newDueDate.split("-");
            newDueDateObject = new Date(year, month -1, day);
        }else {
            newDueDateObject = newDueDate;
        }
        
        const newTask = new Task(newTitle, newDescription, newDueDateObject, newPriority, newIsDone);

        arrayOfProjects[projectIndex].tasks.push(newTask);
        addArrayToLocalStorage(arrayOfProjects);

        this.listTasks(projectIndex, arrayOfProjects);
    }

    createButtonToAddProject(){
        const addProjectButton = document.createElement("button");
        const listOfProjects = document.querySelector(".aside ul")
        addProjectButton.textContent = "New Project";
        this.myAside.insertBefore(addProjectButton, listOfProjects);

        addProjectButton.addEventListener("click", ()=>{
            this.newProjectModal.showModal();
        })
    }

    createAddNewProjectDialog(arrayOfProjects){
        this.newProjectModal= document.createElement("dialog");
        const newProjectForm = document.createElement("form");
        const newProjectTitleConatiner = document.createElement("div");
        const newProjectControllersConatiner = document.createElement("div");
        const newProjectButtonConatiner = document.createElement("div");
        const newProjectTitle = document.createElement("h1");
        const newProjectParagraph = document.createElement("p");
        const newProjecNameLabel = document.createElement("label");
        const newProjecNameinput = document.createElement("input");
        const newProjectSubmitButton = document.createElement("input");
        const newCancelProjectButton = document.createElement("button");

        newProjectTitle.textContent = "New Project";
        newProjectParagraph.textContent = "Fill in the input with the project name";
        newProjecNameLabel.textContent = "Name";
        newCancelProjectButton.textContent = "X"

        this.newProjectModal.setAttribute("closedby", "any");
        this.newProjectModal.setAttribute("id", "newProjectModal");

        newProjectTitleConatiner.setAttribute("class", "title");
        newProjectControllersConatiner.setAttribute("class", "controller");
        newProjectButtonConatiner.setAttribute("class", "button");

        newProjecNameLabel.setAttribute("for", "newproject");
        newProjecNameinput.setAttribute("type", "text");
        newProjecNameinput.setAttribute("name", "newproject");
        newProjecNameinput.setAttribute("id", "newproject");
        newProjecNameinput.setAttribute("required", "true");
        newProjecNameinput.setAttribute("minlength", "3");
        newProjecNameinput.setAttribute("maxlength", "30");

        newProjectSubmitButton.setAttribute("type", "submit");
        newProjectSubmitButton.setAttribute("value", "Add Project");
        newProjectSubmitButton.setAttribute("name", "addProject");

        newCancelProjectButton.setAttribute("type", "button");
        newCancelProjectButton.setAttribute("value", "X");
        newCancelProjectButton.setAttribute("formmethod", "dialog");

        this.body.appendChild(this.newProjectModal);
        this.newProjectModal.appendChild(newProjectForm);
        newProjectForm.appendChild(newProjectTitleConatiner);
        newProjectForm.appendChild(newProjectControllersConatiner);
        newProjectForm.appendChild(newProjectButtonConatiner);
        newProjectTitleConatiner.appendChild(newProjectTitle);
        newProjectTitleConatiner.appendChild(newProjectParagraph);
        newProjectControllersConatiner.appendChild(newProjecNameLabel);
        newProjectControllersConatiner.appendChild(newProjecNameinput);
        newProjectButtonConatiner.appendChild(newCancelProjectButton);
        newProjectButtonConatiner.appendChild(newProjectSubmitButton);


        newCancelProjectButton.addEventListener("click", ()=>{
            this.newProjectModal.close();
        });

        newProjectForm.addEventListener("submit", (event)=>{
            
            this.addNewProject(arrayOfProjects);
        
            event.preventDefault();
            this.newProjectModal.close();
            newProjectForm.reset();
        })
    }

    addNewProject(arrayOfProjects){
        const newProjectName = document.querySelector('input[name="newproject"]').value;
        const newProject = new Project(newProjectName, []);

        arrayOfProjects.push(newProject);
        addArrayToLocalStorage(arrayOfProjects);

        this.createProjects(arrayOfProjects);
    }

    CreateButtonsToControlTheAside() {
        const headerContainer = document.querySelector(".header");

        const buttonsContainer = document.createElement("div");
        const burguerButton = document.createElement("button");
        const closeButton = document.createElement("button");
        const listIcon = document.createElement("img");
        const closeIcon = document.createElement("img");

        listIcon.setAttribute("src", `${list}`);
        closeIcon.setAttribute("src", `${xLg}`);

        buttonsContainer.setAttribute("class", "buttons");
        listIcon.setAttribute("class", "list");
        closeIcon.setAttribute("class", "close");

        headerContainer.appendChild(buttonsContainer);
        buttonsContainer.appendChild(listIcon);
        buttonsContainer.appendChild(closeIcon);

        listIcon.addEventListener('click', ()=>{
            listIcon.setAttribute("id", "hide");
            closeIcon.setAttribute("id", "show");
            this.myAside.classList.toggle("showAside");
        })

        closeIcon.addEventListener('click', ()=>{
            closeIcon.setAttribute("id", "hide");
            listIcon.setAttribute("id", "show");
            this.myAside.classList.toggle("showAside");
        })
    }

}

export {DomManipulation};