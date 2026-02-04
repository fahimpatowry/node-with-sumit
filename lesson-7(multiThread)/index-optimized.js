const express = require("express")
const {Worker}  = require("worker_threads")

const app = express()
const prot = 3000
const Thread_Count = 4

function createWorker(){
    return new Promise((resolve, rejects)=>{
        const worker= new Worker('./worker-optimized.js', {
            workerData:{
                thread_count: Thread_Count,
            }
        });

        worker.on("message", (data)=>{
            // res.status(200).send(`This is page in blocking ${data}`)
            resolve(data)
        })
    
        worker.on("error", (err)=>{
            // res.status(400).send(`An Error" ${err}`)
            rejects(`An Error" ${err}`)
        })
    });
}

app.get("/non-blocking",(req, res)=>{
    res.status(200).send("This is page in non-blocking")
})

app.get("/blocking", async (req, res)=>{
    const workerPromises = [];
    
    for(let i = 0; i < Thread_Count; i++){
        workerPromises.push(createWorker())
    }
    
    const threadResult = await promise.all(workerPromises)
    const total = threadResult[0] + threadResult[1] + threadResult[2]+ threadResult[3];
    
    res.status(200).send(`This is page in blocking ${total}`)
})

app.listen(prot, ()=>{
    console.log(`App listening on port ${prot}`)
})
