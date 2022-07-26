const express = require('express');
const app = express();
app.use(express.static('client'));
app.use(express.json());

// method to get list of available locations
app.get('/locations', function (req, resp) {
    // get keys from data structure
    const locations = "test of locations url"
    resp.json(locations);

    // set http czode and end response
    resp.status(200);
    resp.end();
});

// export to app file
module.exports = app;
