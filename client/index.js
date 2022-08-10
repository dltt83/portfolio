// function fro handling page on load
window.addEventListener('load', async function (event) {
    let response = await fetch('http://127.0.0.1:8090/projects');
    let body = await response.json();

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

        for (let currentProject of projects) {
            // create div and assign class
            let div = document.createElement('div');
            div.setAttribute("class", "portItem");
            
            // set div background image and position
            div.style.backgroundImage=`url(media/${currentProject}-cover.png)`
            div.style.backgroundPosition="100% 70%"

            // create view button in div and give id and class
            const viewButton = document.createElement('button');
            viewButton.innerHTML = currentProject
            viewButton.setAttribute('id', `${currentProject}-view`);
            viewButton.setAttribute('class', 'portItem-button')
            
            // create function on button press
            viewButton.addEventListener('click', async function (event) {
                event.preventDefault();
                
                renderContent(currentProject, projects);
            });
            
            
            // append children to div
            div.appendChild(viewButton);
            
            // append div to main content div
            container.appendChild(div);
        }
    } else if (page === "etsAutopilot") {
        console.log("ets autopilot page")
    } else if (page === "bedBooking") {
        console.log("bed booking page")
    }
}