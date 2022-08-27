const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(express.static('client'));
app.use(express.json());
app.use(helmet());


const data = require("./siteData.json");

app.get('/siteData', function (req, resp) {
    resp.json(data);
    
    resp.status(200);
    resp.end();
})

// export to app file
module.exports = app;
