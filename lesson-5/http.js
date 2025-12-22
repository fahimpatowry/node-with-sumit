const http = require("http");

// const server = http.createServer();
const server = http.createServer((req, res) => {
  if ((req.url === "/")) {
    res.write("Hello Node js");
    res.end();
  }else if(req.url === '/about'){
    res.write("about us page");
    res.end();
  }else{
    res.write("not found page");
    res.end();

  }
});

// server.on('connection', ()=> {
//     console.log('New connection ...')
// })

server.listen(3000);

console.log("listing on port 3000");
