const express = require("express")
const {Worker}  = require("worker_threads")

const app = express()
const prot = 3000

app.get("/non-blocking",(req, res)=>{
    res.status(200).send("This is page in non-blocking")
})

app.get("/blocking",(req, res)=>{
    const worker = new Worker('./worker.js')
    
    worker.on("message", (data)=>{
        res.status(200).send(`This is page in blocking ${data}`)
    })

    worker.on("error", (err)=>{
        res.status(400).send(`An Error" ${err}`)
    })
})

app.listen(prot, ()=>{
    console.log(`App listening on port ${prot}`)
})
