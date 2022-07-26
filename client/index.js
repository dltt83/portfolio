// function fro handling page on load
window.addEventListener('load', async function (event) {
    // reder page content for home page
    renderContent('Home');
});

// ===== funcitons for rendering content to DOM =====

// funciton to render main content on DOM
function renderContent (page) {
    // redering content for home page
    if (page === 'Home') {
        // main div for page content
        const pageDiv = document.getElementById('main_page');
        pageDiv.innerHTML = '';

        // set heading
        const testHeading = document.createElement('h1');
        testHeading.innerHTML = 'test heading';
        pageDiv.appendChild(testHeading);
    } else if (page === 'Locations') {
        // main div for page content
        const pageDiv = document.getElementById('main_page');
        pageDiv.innerHTML = '';

        // set heading
        const postTitle = document.createElement('h1');
        postTitle.innerHTML = 'Locations Available';
        pageDiv.appendChild(postTitle);

        // create list for posts to go into
        const postsList = document.createElement('ul');
        postsList.setAttribute('id', 'posts');
        pageDiv.appendChild(postsList);

        // get container for post list
        const container = document.getElementById('posts');
        container.innerHTML = '';
        // loop through posts and add to list items in post list
        for (const post of posts) {
            const item = document.createElement('li');
            item.innerHTML = post;
            container.appendChild(item);
        }
    } else {
        // main div for page content
        const pageDiv = document.getElementById('main_page');
        pageDiv.innerHTML = '';

        // set heading
        const postTitle = document.createElement('h1');
        postTitle.setAttribute('id', 'postTitle');
        postTitle.innerHTML = `Posts: ${location}`;
        pageDiv.appendChild(postTitle);

        // create form for adding new items
        const addForm = document.createElement('form');
        addForm.setAttribute('action', `http://127.0.0.1:8090/posts/add/:${location}`);
        addForm.setAttribute('method', 'post');

        // create box for new post
        const newthingBox = document.createElement('input');
        newthingBox.setAttribute('id', 'newthing');
        newthingBox.setAttribute('type', 'text');
        newthingBox.setAttribute('name', 'newthing');
        newthingBox.setAttribute('class', 'inputBox');
        addForm.appendChild(newthingBox);

        // create submit button for add form
        const submitButton = document.createElement('input');
        submitButton.setAttribute('id', 'formSubmit');
        submitButton.setAttribute('type', 'submit');
        addForm.appendChild(submitButton);

        pageDiv.appendChild(addForm);

        // set action for submit button
        getSubmit(location);

        // create list for posts
        const postsList = document.createElement('ul');
        postsList.setAttribute('id', 'posts');
        postsList.setAttribute('class', 'postList');
        pageDiv.appendChild(postsList);

        // add title for postlist
        const title = document.getElementById('postTitle');
        title.innerHTML = `Posts: ${location}`;

        // loop through and add posts to postlist
        const container = document.getElementById('posts');
        container.innerHTML = '';
        for (const post of posts) {
            const item = document.createElement('li');
            item.setAttribute('class', 'post');
            item.innerHTML = post;
            container.appendChild(item);
        }
    }
}

// ===== Setting actions to buttons on page =====

// function to set action to be performed on form submit button
function getSubmit (location) {
    // get submit button
    const submit = document.getElementById('formSubmit');
    if (submit) {
        submit.addEventListener('click', async function (event) {
            event.preventDefault();
            // get new value from form
            const newthing = document.getElementById('newthing').value;
            const parameters = { newthing: newthing };
            // get respose from server
            const response = await fetch(`http://127.0.0.1:8090/posts/add/:${location}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parameters)
            });
            // re-render body content with new post
            const body = await response.json();
            renderContent(body, location);
        });
    }
}

// set actions to home buttons
const homeButton = document.getElementById('homeButton');
homeButton.addEventListener('click', async function (event) {
    event.preventDefault();
    renderContent([], 'Home');
});

// second home button on top bar
const homeButton2 = document.getElementById('homeButton2');
homeButton2.addEventListener('click', async function (event) {
    event.preventDefault();
    renderContent([], 'Home');
});
