const express = require("express");
const app = express()
const rootRouter = require('./routers/rootRouter')
const PORT = process.env.PORT ?? 5000

app.use(express.json())



const start = () => {
    try {
        app.use("/api", rootRouter)
        // app.get("/api", (req, res) => {
        //     return res.json("main")
        // })
        // app.get("/api/test", (req, res) => {
        //     return res.json("test")
        // })

        app.listen(PORT, () => console.log(`server runned on port:${PORT}`))
    } catch (e) {
        console.error(e);
    }
}

start()