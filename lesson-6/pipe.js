
const fs = require('fs');

const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);
const ourWriteStream = fs.createWriteStream(`${__dirname}/output-pipe.txt`);

ourReadStream.pipe(ourWriteStream)
