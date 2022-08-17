// function fro handling page on load
window.addEventListener('load', async function (event) {
    let response = await fetch('http://127.0.0.1:8090/siteData');
    let body = await response.json();

    // render page content for home page
    renderContent('Home', body);
});

// ===== funcitons for rendering content to DOM =====

// function to render navbar at top of page
function renderNavbar (SITE_DATA) {
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
                
                renderContent("Home", SITE_DATA)
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

function renderHome (SITE_DATA) {
    // get main contatiner and clear
    let container = document.getElementById('main_page');
    container.innerHTML = "";

    const projects = SITE_DATA.projects
    
    // render button for each project
    for (let currentProject of projects) {
        // create div and assign class
        let div = document.createElement('div');
        div.setAttribute("class", "portItem");
        
        // set div background image and position
        div.style.backgroundImage=`url(media/${currentProject.coverImage})`
        div.style.backgroundPosition="100% 70%"

        // create view button in div and give id and class
        const viewButton = document.createElement('button');
        viewButton.innerHTML = currentProject.prettyName
        viewButton.setAttribute('id', `${currentProject.id}-view`);
        viewButton.setAttribute('class', 'portItem-button')
        
        // create function on button press
        viewButton.addEventListener('click', function (event) {
            event.preventDefault();
            
            renderContent(currentProject.id, SITE_DATA);
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
    title.innerHTML = project.prettyName
    container.appendChild(title)

    // loop through paragraphs from json and add to page
    for (let paragraph of project.waffle) {
        let newPara = document.createElement("p")
        newPara.innerHTML = paragraph
        container.appendChild(newPara)
    }

    let githubLink = document.createElement("a")
    githubLink.setAttribute("href", project.github)
    githubLink.setAttribute("class", "gitLink")
    githubLink.innerHTML = "Github Repository"
    container.appendChild(githubLink)

    // loop through images in json and add to page
    for (let imageName of project.otherImages) {
        let newImage = document.createElement("img")
        newImage.setAttribute("src", `./media/${imageName}`)
        newImage.setAttribute("class", "project-image")
        container.appendChild(newImage)
    }
}

// funciton to render main content on DOM
function renderContent (page, SITE_DATA) {
    // render navbar
    renderNavbar(SITE_DATA);
    
    // rendering content for home page
    if (page === 'Home') {
        // call function to render home page
        renderHome(SITE_DATA);

    } else {
        // call function to render page with corrent content
        // renderProject(SITE_DATA.projects[id=page]);      <- should work, dont know why it doesnt
        
        // loop through projects to find one with correct ID
        for (let currentProject of SITE_DATA.projects) {
            if (currentProject.id == page) {
                renderProject(currentProject);
                
                break;
            }
        }

    } // end if
}; // end function