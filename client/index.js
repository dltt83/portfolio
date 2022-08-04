// function fro handling page on load
window.addEventListener('load', async function (event) {
    let body = ["something", "something else"]

    let response = await fetch('http://127.0.0.1:8090/projects');
    body = await response.json();

    // reder page content for home page
    renderContent('Home', body);
});

// ===== funcitons for rendering content to DOM =====

// funciton to render main content on DOM
function renderContent (page, projects) {
    // redering content for home page
    if (page === 'Home') {
        let container = document.getElementById('main_page');
        container.innerHTML = "";

        for (let thing of projects) {
            let item = document.createElement('li');
            item.innerHTML= thing;
            container.appendChild(item);
        }
    }
}