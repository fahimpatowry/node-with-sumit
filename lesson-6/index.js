const fs = require('fs');

const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, "utf");

ourReadStream.on("data", (chunk)=>{
    console.log(chunk)
    // console.log(chunk.toString())
})
