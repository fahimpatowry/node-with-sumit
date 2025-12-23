/*
 * Title: Uptime Monitoring Application
 * Description: A RestFul API to monitor up or down time of user defined links
 * Author: Fahim (Learn with Sumit)
 * Date: 23/12/2025
 * 
*/

// dependencies
const http = require('http');

// app object - module scaffolding
const app = {}

// configuration
app.config = {
    port: 3000
}

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, ()=> {
        // console.log(`listening to port ${app.config.port}`);
    })
}

// handle Request Response
app.handleReqRes = (req, res) => {
    res.end('Hello World hi');
}


// start the server
app.createServer();

