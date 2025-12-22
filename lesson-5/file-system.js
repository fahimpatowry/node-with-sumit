const fs = require('fs')

// ------- Synchronous way block other task ------
// fs.writeFileSync("myfile.txt", 'hello node js')
// fs.appendFileSync("myfile.txt", ' how are you')
// const data = fs.readFileSync("myfile.txt")
// console.log(data.toString())

// ------- asynchronous way block other task ------
fs.readFile("myfile.txt", (err, data)=>{
    console.log(data.toString())
})
console.log("hello")
