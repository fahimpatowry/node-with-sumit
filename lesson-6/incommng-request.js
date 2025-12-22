const http = require("http");

// const server = http.createServer();
const server = http.createServer((req, res) => {
  if ((req.url === "/")) {
    res.write('<html><head><title>Form</title></head>');
    res.write('<body><form method="post" action="/process"><input name="massage" /></form></body></html>');
    res.end();
  }else if(req.url === '/process' && req.method === 'POST'){
    const body = []
    // req.on("data", (chunk)=> {
    //     console.log(chunk.toString())
    // }) 
    req.on("data", (chunk)=> {
        body.push(chunk)
    }) 
    req.on("end", (chunk)=> {
        console.log("string finished")

        const presData = Buffer.concat(body).toString()
        console.log(presData)
    }) 
    res.write("Thank you");
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
