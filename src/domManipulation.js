class DomManipulation{

    body = document.querySelector("body");
    myHeader;
    myAside;
    myMain;
    myTitle;

    createEssentials(){
        this.myHeader = document.createElement("div");
        this.myAside = document.createElement("div");
        this.myMain = document.createElement("div");
        this.myTitle = document.createElement("h1");

        this.myTitle.textContent = "Todo-list";

        this.myHeader.classList.add("header");
        this.myAside.classList.add("aside");
        this.myMain.classList.add("main");

        this.body.appendChild(this.myHeader);
        this.body.appendChild(this.myAside);
        this.body.appendChild(this.myMain);
        this.myHeader.appendChild(this.myTitle);
    }

}

export {DomManipulation};