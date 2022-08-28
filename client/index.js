// function fro handling page on load
window.addEventListener('load', async function (event) {
    const url = "mysterious-chamber-62012.herokuapp.com"
    let response = await fetch(`https://${url}/siteData`);
    globalThis.SITE_DATA = await response.json();

    // render page content for home page
    renderContent('Home', SITE_DATA);
});

window.addEventListener('popstate', function(event) {
});

onpopstate = (event) => {
    console.log("back button pressed");
    renderContent('Home', SITE_DATA);
};

// ===== funcitons for rendering content to DOM =====

// function to render navbar at top of page
function renderNavbar (SITE_DATA) {
    let navbarDiv = document.getElementById("navbar-div");
    navbarDiv.innerHTML = ""
    let buttons = ["Josh Lodge Software", "About Me", "Contact Info"];
    let links = ["Home", "About", "Links"]

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
        } else {
            newButton.innerHTML = currentButton;
        }

        // create function on button press to load main page
        newButton.addEventListener('click', function (event) {
            event.preventDefault();
            
            renderContent(links[buttons.indexOf(currentButton)], SITE_DATA)
        });

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

        // create view button in div and give id and class
        const viewButton = document.createElement('button');
        viewButton.innerHTML = currentProject.prettyName
        viewButton.setAttribute('id', `${currentProject.id}-button`);
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

    if (project.github != "") {
        let githubLink = document.createElement("a")
        githubLink.setAttribute("href", project.github)
        githubLink.setAttribute("class", "link")
        githubLink.innerHTML = "Github Repository"
        container.appendChild(githubLink)
    }

    // loop through images in json and add to page
    for (let imageName of project.otherImages) {
        let newImage = document.createElement("img")
        newImage.setAttribute("src", `./media/${imageName}`)
        newImage.setAttribute("class", "project-image")
        container.appendChild(newImage)

        caption = project.captions[project.otherImages.indexOf(imageName)]
        if (caption != "") {
            let imageCaption = document.createElement("p")
            imageCaption.innerHTML = caption
            container.appendChild(imageCaption)
        }
    }
}

function renderAbout (SITE_DATA) {
    // get main contatiner and clear
    let container = document.getElementById('main_page');
    container.innerHTML = "";

    // give page title
    let title = document.createElement("h1")
    title.setAttribute("class", "page-title")
    title.innerHTML = "About Me"
    container.appendChild(title)

    // loop through paragraphs from json and add to page
    for (let paragraph of SITE_DATA.about.waffle) {
        let newPara = document.createElement("p")
        newPara.innerHTML = paragraph
        container.appendChild(newPara)
    }

    let cvButton = document.createElement("a")
    cvButton.setAttribute("href", SITE_DATA.links.cv)
    cvButton.setAttribute("class", "link")
    cvButton.innerHTML = "Personal CV"
    container.appendChild(cvButton) 

    // loop through images in json and add to page
    for (let imageName of SITE_DATA.about.pictures) {
        let newImage = document.createElement("img")
        newImage.setAttribute("src", `./media/${imageName}`)
        newImage.setAttribute("class", "about-image")
        container.appendChild(newImage)
    }
}

function renderContact (SITE_DATA) {
    // get main contatiner and clear
    let container = document.getElementById('main_page');
    container.innerHTML = "";

    // give page title
    let title = document.createElement("h1")
    title.setAttribute("class", "page-title")
    title.innerHTML = "Contact Me"
    container.appendChild(title)

    let email = document.createElement("a")
    email.setAttribute("href", `mailto:${SITE_DATA.links.email}`)
    email.setAttribute("class", "link")
    email.innerHTML = "Email: josh.lodge07@gmail.com"
    container.appendChild(email)

    let githubLink = document.createElement("a")
    githubLink.setAttribute("href", SITE_DATA.links.github)
    githubLink.setAttribute("class", "link")
    githubLink.innerHTML = "Personal Github Account"
    container.appendChild(githubLink)

    let linkedIn = document.createElement("a")
    linkedIn.setAttribute("href", SITE_DATA.links.linkedIn)
    linkedIn.setAttribute("class", "link")
    linkedIn.innerHTML = "LinkedIn"
    container.appendChild(linkedIn)

    let cvButton = document.createElement("a")
    cvButton.setAttribute("href", SITE_DATA.links.cv)
    cvButton.setAttribute("class", "link")
    cvButton.innerHTML = "Personal CV"
    container.appendChild(cvButton) 
}

// funciton to render main content on DOM
function renderContent (page, SITE_DATA) {
    // render navbar
    renderNavbar(SITE_DATA);
    
    // rendering content for home page
    if (page === 'Home') {
        // call function to render home page
        renderHome(SITE_DATA);

    } else if (page === 'About') {
        renderAbout(SITE_DATA)
    } else if (page === 'Links') {
        renderContact(SITE_DATA)
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