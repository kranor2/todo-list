let projectlist = [];

function loadProjectlist() {
    if (localStorage.getItem("projectlist") === null) return false;
    projectlist = JSON.parse(localStorage.getItem("projectlist"));
}

function saveProjectlist() {
    localStorage.setItem("projectlist", JSON.stringify(projectlist));
}

export { projectlist, loadProjectlist, saveProjectlist };