const express = require('express');
const app = express();
app.use(express.static('client'));
app.use(express.json());

// method to get list of available locations
app.get('/projects', function (req, resp) {
    // get keys from data structure
    const projects = ["etsAutopilot", "bedBooking"]
    resp.json(projects);

    // set http code and end response
    resp.status(200);
    resp.end();
});

// export to app file
module.exports = app;
