function addArrayToLocalStorage(arrayOfProjects){
    let arrayOfProjectsStringified = JSON.stringify(arrayOfProjects);
    localStorage.setItem("arrayOfProjects", arrayOfProjectsStringified);
}

function getItemFromLocalStorage(){
    let arrayOfProjectsStringified = localStorage.getItem("arrayOfProjects");
    let arrayOfProjects = JSON.parse(arrayOfProjectsStringified);
    return arrayOfProjects;
}

export {addArrayToLocalStorage, getItemFromLocalStorage}