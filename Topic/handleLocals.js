
const handleLocals = (req, res)=>{
    console.log(`this is local variable ${req.app.locals.title}`)
}

module.exports = handleLocals;