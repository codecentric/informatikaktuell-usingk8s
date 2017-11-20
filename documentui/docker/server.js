let os = require('os');
let hostname = os.hostname();
console.log('running on ' + hostname);


let path = require("path"),
    express = require("express");

let DIST_DIR = path.join(__dirname, "dist"),
    PORT = 3000,
    app = express();

// logging
let morgan = require('morgan');
app.use(morgan('combined'));

// close connection to see loadbalancing
let closeConnection = function (req, res, next) {
    res.setHeader('Connection', 'close'); next()
};
app.use('*', closeConnection);

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));


// proxy all requests to /api to the service running on port 8080 (or whatever is given as environment or argument),
// stripping the api part
let requestProxy = require('express-request-proxy');
let apiHost = process.argv[2] || process.env.API_HOST || 'localhost:8080';
let proxy = requestProxy({
  url: 'http://' + apiHost + '/*',
  query: {
    via: hostname
  }
});
app.get('/api/*', proxy);
app.post('/api/*', proxy);


//Send index.html when the user accesses anything
app.get("*", function (req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT);
