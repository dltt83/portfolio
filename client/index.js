// function fro handling page on load
window.addEventListener('load', async function (event) {
    let response = await fetch('http://127.0.0.1:8090/projects');
    let body = await response.json();

    // reder page content for home page
    renderContent('Home', body);
});

// ===== funcitons for rendering content to DOM =====

// function to render navbar at top of page
function renderNavbar (projects) {
    let navbarDiv = document.getElementById("navbar-div");
    navbarDiv.innerHTML = ""
    let buttons = ["Josh Lodge Software", "About Me", "Contact Info"];

    for (let currentButton of buttons) {
        // create new button and give class
        let newButton = document.createElement("button");
        newButton.setAttribute("class", "navbar-button");

        // give button text and heading if home button
        if (currentButton === "Josh Lodge Software") {
            let homeHeading = document.createElement("h1");
            homeHeading.setAttribute("class", "navbar-heading");
            homeHeading.innerHTML = currentButton;
            newButton.appendChild(homeHeading)

            // create function on button press to load main page
            newButton.addEventListener('click', function (event) {
                event.preventDefault();
                
                renderContent("Home", projects)
            });
        } else {
            newButton.innerHTML = currentButton;
            
            // create function on button press to load relevant page
            newButton.addEventListener('click', function (event) {
                event.preventDefault();
                
                console.log(currentButton)
            });
        }


        navbarDiv.appendChild(newButton)
    }
}

function renderHome (projects) {
    // get main contatiner and clear
    let container = document.getElementById('main_page');
    container.innerHTML = "";
    
    // render button for each project
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
        viewButton.addEventListener('click', function (event) {
            event.preventDefault();
            
            renderContent(currentProject, projects);
        });
        
        // append children to div
        div.appendChild(viewButton);
    
        // append div to main content div
        container.appendChild(div);
    }
}

function renderProject (project) {
    // get main contatiner and clear
    let container = document.getElementById('main_page');
    container.innerHTML = "";

    // give page title
    let title = document.createElement("h1")
    title.setAttribute("class", "page-title")
    title.innerHTML = project

    container.appendChild(title)
}

// funciton to render main content on DOM
function renderContent (page, projects) {
    // render navbar
    renderNavbar(projects);
    
    // rendering content for home page
    if (page === 'Home') {
        // call function to render home page
        renderHome(projects);

    } else if (page === "etsAutopilot") {
        // render page for ets
        renderProject(page)

    } else if (page === "bedBooking") {
        // render page for bed booking
        renderProject(page)

    } // end if
}; // end function