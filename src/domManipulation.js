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
            myProject.classList.add(`${project.id}`);
            this.projectList.appendChild(myProject);
        })
    }

}

export {DomManipulation};