const express = require("express")
const cors = require('cors')
const dbRouter = require('./routes/db_rout')
const adminRouter = require('./routes/admin_rout')


const app = express()
const port =  8080


app.use(express.json())
app.use(cors())
app.use("/database", dbRouter)
app.use("/admin", adminRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
